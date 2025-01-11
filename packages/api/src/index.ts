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

type TableKeys = keyof Pick<typeof schema, 'posts' | 'categories' | 'tags'>
type RelationalTableKeys = keyof Pick<typeof schema, 'categories' | 'tags'>

type Post = InferSelectModel<typeof schema.posts>
type Category = InferSelectModel<typeof schema.categories>
type Tag = InferSelectModel<typeof schema.tags>

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

type DeleteRecordsArgs = { tableKey: TableKeys; ids: number[] }

type FindOrCreateRecordsArgs = {
    tx: Transaction
    tableKey: RelationalTableKeys
    names: string[]
}

type RelatePostToRecordsArgs = {
    tx: Transaction
    postRelationFields: PostRelationFields[]
    table: typeof schema.postsToCategories | typeof schema.postsToTags
}

type PostRelationFields = {
    postId: number
    categoryId?: number
    tagId?: number
}

type Transaction = PgTransaction<
    NodePgQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
>

const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL,
    },
    schema,
    casing: 'snake_case',
})

async function findOrCreateRecords({
    tx,
    tableKey,
    names,
}: FindOrCreateRecordsArgs) {
    const table = schema[tableKey]

    const existingRecords = await tx
        .select({ id: table.id, name: table.name })
        .from(table)
        .where(inArray(table.name, names))

    const existingRecordNames = new Set(existingRecords.map((e) => e.name))

    const newRecordNames = names.filter(
        (name) => !existingRecordNames.has(name)
    )

    if (newRecordNames.length === 0) return existingRecords

    const newRecords = await tx
        .insert(table)
        .values(newRecordNames.map((name) => ({ name })))
        .onConflictDoNothing({ target: table.name })
        .returning({ id: table.id, name: table.name })

    return [...existingRecords, ...newRecords]
}

async function relatePostToRecords({
    tx,
    postRelationFields,
    table,
}: RelatePostToRecordsArgs) {
    if (!postRelationFields?.length) {
        throw new Error('postRelationFields cannot be empty')
    }

    await tx.insert(table).values(postRelationFields)
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

            const categoryRecords: Category[] = []
            const tagRecords: Tag[] = []

            if (categories.length > 0) {
                categoryRecords.push(
                    ...(await findOrCreateRecords({
                        tx,
                        tableKey: 'categories',
                        names: categories,
                    }))
                )
                await relatePostToRecords({
                    tx,
                    postRelationFields: categoryRecords.map((category) => ({
                        postId,
                        categoryId: category.id,
                    })),
                    table: schema.postsToCategories,
                })
            }

            if (tags.length > 0) {
                tagRecords.push(
                    ...(await findOrCreateRecords({
                        tx,
                        tableKey: 'tags',
                        names: tags,
                    }))
                )

                await relatePostToRecords({
                    tx,
                    postRelationFields: tagRecords.map((tag) => ({
                        postId,
                        tagId: tag.id,
                    })),
                    table: schema.postsToTags,
                })
            }

            if (categoryRecords.length > 0 && tagRecords.length > 0) {
                const tagsToCategoriesRelations = tagRecords.flatMap((tag) =>
                    categoryRecords.map((category) => ({
                        tagId: tag.id,
                        categoryId: category.id,
                    }))
                )

                await tx
                    .insert(schema.tagsToCategories)
                    .values(tagsToCategoriesRelations)
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
    offset = 0,
}: GetPostsArgs = {}) {
    try {
        const result = await db.query.posts.findMany({
            where: (posts, { eq, ilike, and }) => {
                const conditions = []
                if (id) conditions.push(eq(posts.id, id))
                if (title) conditions.push(ilike(posts.title, `%${title}%`))
                if (content)
                    conditions.push(ilike(posts.content, `%${content}%`))
                return conditions.length > 0 ? and(...conditions) : undefined
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
        return await db.transaction(async (tx) => {
            const { categories, tags, ...additionalFields } = data

            if (Object.keys(additionalFields).length > 0) {
                await tx
                    .update(schema.posts)
                    .set({ ...additionalFields, updated_at: new Date() })
                    .where(eq(schema.posts.id, id))
            }

            const categoryRecords: Category[] = []
            const tagRecords: Tag[] = []

            if (categories) {
                await tx
                    .delete(schema.postsToCategories)
                    .where(eq(schema.postsToCategories.postId, id))

                if (categories.length > 0) {
                    categoryRecords.push(
                        ...(await findOrCreateRecords({
                            tx,
                            tableKey: 'categories',
                            names: categories,
                        }))
                    )
                    await relatePostToRecords({
                        tx,
                        postRelationFields: categoryRecords.map((category) => ({
                            postId: id,
                            categoryId: category.id,
                        })),
                        table: schema.postsToCategories,
                    })
                }
            }

            if (tags) {
                await tx
                    .delete(schema.postsToTags)
                    .where(eq(schema.postsToTags.postId, id))

                if (tags.length > 0) {
                    tagRecords.push(
                        ...(await findOrCreateRecords({
                            tx,
                            tableKey: 'tags',
                            names: tags,
                        }))
                    )
                    await relatePostToRecords({
                        tx,
                        postRelationFields: tagRecords.map((tag) => ({
                            postId: id,
                            tagId: tag.id,
                        })),
                        table: schema.postsToTags,
                    })
                }
            }

            if (categoryRecords.length > 0 && tagRecords.length > 0) {
                const tagsToCategories = tagRecords.flatMap((tag) =>
                    categoryRecords.map((category) => ({
                        tagId: tag.id,
                        categoryId: category.id,
                    }))
                )
                await tx
                    .insert(schema.tagsToCategories)
                    .values(tagsToCategories)
            }

            return { id }
        })
    } catch (error) {
        console.error('Failed to update post', { error })
        throw new Error('Failed to update post')
    }
}

export async function deleteRecords({ tableKey, ids }: DeleteRecordsArgs) {
    const table = schema[tableKey]

    try {
        return await db.delete(table).where(inArray(table.id, ids))
    } catch (error) {
        console.error('Failed to delete record(s)', { error })
        throw new Error('Failed to delete record(s)')
    }
}
