import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './db/schema'
import { eq, InferSelectModel } from 'drizzle-orm'

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
        throw new Error('Missing title and/or content')
    }

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
}: GetPostsArgs) {
    const result = await db.query.posts.findMany({
        where: (posts, { eq, ilike, and }) => {
            const conditions = []
            if (id) conditions.push(eq(posts.id, id))
            if (title) conditions.push(ilike(posts.title, `%${title}%`))
            if (content) conditions.push(ilike(posts.content, `%${content}%`))
            return and(...conditions)
        },
        with: withRelations
            ? { postsToCategories: true, postsToTags: true }
            : { postsToCategories: categories, postsToTags: tags },
        limit,
        offset,
    })

    return result
}
