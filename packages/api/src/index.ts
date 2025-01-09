import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './db/schema'
import { eq, inArray, InferSelectModel } from 'drizzle-orm'

type Models = keyof Pick<typeof schema, 'posts' | 'categories' | 'tags'>
type Post = InferSelectModel<typeof schema.posts>

type CreatePostArgs = Partial<Post> & {
    categories?: string[]
    tags?: string[]
}

type GetPostsArgs = {
    id?: number
    title?: string
    content?: string
    withRelations?: true
    categories?: true
    tags?: true
    limit?: number
    offset?: number
}

type UpdatePostArgs = {
    id: number
    data: CreatePostArgs
}

const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL,
    },
    schema,
    casing: 'snake_case',
})

export async function createPost({
    title,
    content,
    categories = [],
    tags = [],
    ...additionalFields
}: CreatePostArgs) {
    if (!title || !content) {
        console.error('Missing title and/or content')
        throw new Error('Missing title and/or content')
    }

    try {
        const result = await db.transaction(async (tx) => {
            const [newPost] = await tx
                .insert(schema.posts)
                .values({
                    title,
                    content,
                    ...additionalFields,
                })
                .returning({ id: schema.posts.id })

            const postId = newPost.id

            if (categories.length > 0) {
                const categoryIds = await Promise.all(
                    categories.map(async (categoryName) => {
                        const [category] = await tx
                            .select({ id: schema.categories.id })
                            .from(schema.categories)
                            .where(eq(schema.categories.name, categoryName))

                        if (category) {
                            return category.id
                        }

                        const [newCategory] = await tx
                            .insert(schema.categories)
                            .values({ name: categoryName })
                            .returning({ id: schema.categories.id })

                        return newCategory.id
                    })
                )

                await tx.insert(schema.postsToCategories).values(
                    categoryIds.map((categoryId) => ({
                        postId,
                        categoryId,
                    }))
                )
            }

            if (tags.length > 0) {
                const tagIds = await Promise.all(
                    tags.map(async (tagName) => {
                        const [tag] = await tx
                            .select({ id: schema.tags.id })
                            .from(schema.tags)
                            .where(eq(schema.tags.name, tagName))

                        if (tag) {
                            return tag.id
                        }

                        const [newTag] = await tx
                            .insert(schema.tags)
                            .values({ name: tagName })
                            .returning({ id: schema.tags.id })

                        return newTag.id
                    })
                )

                await tx.insert(schema.postsToTags).values(
                    tagIds.map((tagId) => ({
                        postId,
                        tagId,
                    }))
                )
            }

            return newPost
        })

        return result
    } catch (error) {
        console.error('Failed to create post', { error })
        throw new Error('Failed to create post')
    }
}

export async function getPosts({
    id,
    title,
    content,
    withRelations,
    categories,
    tags,
    limit = 10,
    offset,
}: GetPostsArgs = {}) {
    try {
        const result = await db.query.posts.findMany({
            where: (posts, { eq, ilike, and }) => {
                const conditions = []
                if (id) conditions.push(eq(posts.id, id))
                if (title) conditions.push(ilike(posts.title, `%${title}%`))
                if (content)
                    conditions.push(ilike(posts.content, `%${content}%`))
                return and(...conditions)
            },
            with: withRelations
                ? { postsToCategories: true, postsToTags: true }
                : { postsToCategories: categories, postsToTags: tags },
            limit,
            offset,
        })

        return result
    } catch (error) {
        console.error('Failed to get post(s)', { error })
        throw new Error('Failed to get post(s)')
    }
}

export async function updatePost({ id, data }: UpdatePostArgs) {
    try {
        const { categories, tags, ...additionalFields } = data
        const postsSchema = schema.posts

        if (!categories && !tags)
            return await db
                .update(postsSchema)
                .set({ ...additionalFields })
                .where(eq(postsSchema.id, id))

        return await db.transaction(async (tx) => {
            if (categories && categories.length > 0) {
                const allCategories = await tx.query.categories.findMany({
                    where: (table, { inArray }) =>
                        inArray(table.name, categories),
                })

                const notFoundCategories = categories.filter(
                    (category) =>
                        !new Set(
                            allCategories.map((category) => category.name)
                        ).has(category)
                )

                if (notFoundCategories && notFoundCategories.length > 0) {
                    allCategories.push(
                        ...(await tx
                            .insert(schema.categories)
                            .values(
                                notFoundCategories.map((name) => ({ name }))
                            )
                            .returning({
                                id: schema.categories.id,
                                name: schema.categories.name,
                            }))
                    )
                }

                await tx.insert(schema.postsToCategories).values(
                    allCategories.map((category) => ({
                        postId: id,
                        categoryId: category.id,
                    }))
                )

                await tx
                    .update(postsSchema)
                    .set({
                        ...additionalFields,
                        ...allCategories,
                    })
                    .where(eq(postsSchema.id, id))
            }

            if (tags && tags.length > 0) {
                const allTags = await tx.query.tags.findMany({
                    where: (table, { inArray }) => inArray(table.name, tags),
                })

                const notFoundTags = tags.filter(
                    (tag) => !new Set(allTags.map((tag) => tag.name)).has(tag)
                )

                if (notFoundTags && notFoundTags.length > 0) {
                    allTags.push(
                        ...(await tx
                            .insert(schema.tags)
                            .values(notFoundTags.map((name) => ({ name })))
                            .returning({
                                id: schema.tags.id,
                                name: schema.tags.name,
                            }))
                    )
                }

                await tx.insert(schema.postsToTags).values(
                    allTags.map((tag) => ({
                        postId: id,
                        tagId: tag.id,
                    }))
                )

                await tx
                    .update(postsSchema)
                    .set({
                        ...additionalFields,
                        ...allTags,
                    })
                    .where(eq(postsSchema.id, id))
            }

            return await tx.update(postsSchema).set({ ...additionalFields })
        })
    } catch (error) {
        console.error('Failed to update post', { error })
        throw new Error('Failed to update post')
    }
}

export async function deleteRecords(table: Models, ids: number[]) {
    const model = schema[table]

    try {
        return await db.delete(model).where(inArray(model.id, ids))
    } catch (error) {
        console.error('Failed to delete post(s)', { error })
        throw new Error('Failed to delete post(s)')
    }
}
