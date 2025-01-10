import 'dotenv/config'
import { drizzle, NodePgQueryResultHKT } from 'drizzle-orm/node-postgres'
import * as schema from './db/schema'
import {
    eq,
    ExtractTablesWithRelations,
    inArray,
    InferSelectModel,
} from 'drizzle-orm'
import { PgTransaction } from 'drizzle-orm/pg-core'

type Models = keyof Pick<typeof schema, 'posts' | 'categories' | 'tags'>
type Post = InferSelectModel<typeof schema.posts>
type Category = InferSelectModel<typeof schema.categories>
type Tag = InferSelectModel<typeof schema.tags>

type LinkField = {
    postId: number
    categoryId?: number
    tagId?: number
}

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

async function findOrCreateEntities<T extends { id: number; name: string }>(
    tx: PgTransaction<
        NodePgQueryResultHKT,
        typeof schema,
        ExtractTablesWithRelations<typeof schema>
    >,
    entityTable: typeof schema.categories | typeof schema.tags,
    names: string[]
): Promise<T[]> {
    const existingEntities = await tx
        .select({ id: entityTable.id, name: entityTable.name })
        .from(entityTable)
        .where(inArray(entityTable.name, names))

    const existingEntityNames = new Set(existingEntities.map((e) => e.name))

    const newEntityNames = names.filter(
        (name) => !existingEntityNames.has(name)
    )
    if (newEntityNames.length === 0) return existingEntities as T[]

    const newEntities = await tx
        .insert(entityTable)
        .values(newEntityNames.map((name) => ({ name })))
        .returning({ id: entityTable.id, name: entityTable.name })

    return [...existingEntities, ...newEntities] as T[]
}

async function linkPostToEntities(
    tx: PgTransaction<
        NodePgQueryResultHKT,
        typeof schema,
        ExtractTablesWithRelations<typeof schema>
    >,
    linkFields: LinkField[],
    table: typeof schema.postsToCategories | typeof schema.postsToTags
) {
    if (!linkFields || linkFields.length === 0) {
        throw new Error('linkFields cannot be empty')
    }

    await tx.insert(table).values(linkFields)
}

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
        return await db.transaction(async (tx) => {
            const [newPost] = await tx
                .insert(schema.posts)
                .values({ title, content, ...additionalFields })
                .returning({ id: schema.posts.id })

            const postId = newPost.id

            const categoryEntities: Category[] = []
            const tagEntities: Tag[] = []

            if (categories.length > 0) {
                categoryEntities.push(
                    ...(await findOrCreateEntities(
                        tx,
                        schema.categories,
                        categories
                    ))
                )
                await linkPostToEntities(
                    tx,
                    categoryEntities.map((category) => ({
                        postId,
                        categoryId: category.id,
                    })),
                    schema.postsToCategories
                )
            }

            if (tags.length > 0) {
                tagEntities.push(
                    ...(await findOrCreateEntities(tx, schema.tags, tags))
                )
                await linkPostToEntities(
                    tx,
                    tagEntities.map((tag) => ({
                        postId,
                        tagId: tag.id,
                    })),
                    schema.postsToTags
                )
            }

            if (categoryEntities.length > 0 && tagEntities.length > 0) {
                const tagsToCategoriesLinks = tagEntities.flatMap((tag) =>
                    categoryEntities.map((category) => ({
                        tagId: tag.id,
                        categoryId: category.id,
                    }))
                )

                await tx
                    .insert(schema.tagsToCategories)
                    .values(tagsToCategoriesLinks)
            }

            return newPost
        })
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

        return await db.transaction(async (tx) => {
            if (Object.keys(additionalFields).length > 0) {
                await tx
                    .update(schema.posts)
                    .set(additionalFields)
                    .where(eq(schema.posts.id, id))
            }

            const categoryEntities: Category[] = []
            const tagEntities: Tag[] = []

            if (categories) {
                await tx
                    .delete(schema.postsToCategories)
                    .where(eq(schema.postsToCategories.postId, id))

                if (categories.length > 0) {
                    categoryEntities.push(
                        ...(await findOrCreateEntities(
                            tx,
                            schema.categories,
                            categories
                        ))
                    )
                    await linkPostToEntities(
                        tx,
                        categoryEntities.map((category) => ({
                            postId: id,
                            categoryId: category.id,
                        })),
                        schema.postsToCategories
                    )
                }
            }

            if (tags) {
                await tx
                    .delete(schema.postsToTags)
                    .where(eq(schema.postsToTags.postId, id))

                if (tags.length > 0) {
                    tagEntities.push(
                        ...(await findOrCreateEntities(tx, schema.tags, tags))
                    )
                    await linkPostToEntities(
                        tx,
                        tagEntities.map((tag) => ({
                            postId: id,
                            tagId: tag.id,
                        })),
                        schema.postsToTags
                    )
                }
            }

            if (categoryEntities.length > 0 || tagEntities.length > 0) {
                if (categoryEntities.length > 0 && tagEntities.length > 0) {
                    const tagsToCategoriesLinks = tagEntities.flatMap((tag) =>
                        categoryEntities.map((category) => ({
                            tagId: tag.id,
                            categoryId: category.id,
                        }))
                    )

                    await tx
                        .insert(schema.tagsToCategories)
                        .values(tagsToCategoriesLinks)
                }
            }

            return { id }
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
