if (!process.env.NODE_ENV) {
    await import('dotenv/config')
}

import { initTRPC } from '@trpc/server'
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq, inArray, InferSelectModel } from 'drizzle-orm'
import { z } from 'zod'
import * as schema from './db/schema.ts'

/** ============================
 *       TYPE DEFINITIONS
 *  ============================ */

type TableKeys = keyof Pick<typeof schema, 'posts' | 'categories' | 'tags'>
type RelationalTableKeys = keyof Pick<typeof schema, 'categories' | 'tags'>

type Post = InferSelectModel<typeof schema.posts>
type Category = InferSelectModel<typeof schema.categories>
type Tag = InferSelectModel<typeof schema.tags>

type CreatePostArgs = Partial<Post> & {
    categories?: string[]
    tags?: string[]
}

type GetPostArgs = {
    id: number
    withRelations?: true
    categories?: true
    tags?: true
}

type GetPostsArgs = {
    ids?: number[]
    title?: string
    content?: string
    relations?: {
        all?: true
        categories?: true
        tags?: true
    }
    filters?: {
        category?: string
        tag?: string
    }
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

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0]

export type AppRouter = typeof appRouter

/** ============================
 *      INITIALIZATIONS
 *  ============================ */
const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    },
    schema,
    casing: 'snake_case',
})

const t = initTRPC.create()

const trueOrUndefined = z.custom<true | undefined>(
    (val) => val === true || val === undefined,
    {
        message: 'Value must be either `true` or `undefined`',
    }
)

/** ============================
 *        APP ROUTER
 *  ============================ */

export const appRouter = t.router({
    '': t.procedure.query(() => {
        return {
            name: 'miniCMS API',
            version: '1.0.0',
            description:
                'A minimal Content Management System API for managing content and related operations.',
            uptime: process.uptime(),
            health: `${process.env.API_URL}/health`,
            documentation:
                'https://github.com/DevlinRocha/portfolio/tree/main/packages/api/README.md',
        }
    }),
    health: t.procedure.query(async () => {
        return await healthCheck()
    }),
    createPost: t.procedure
        .input(
            z.object({
                title: z.string(),
                content: z.string(),
                image: z.string(),
                categories: z.array(z.string()).optional(),
                tags: z.array(z.string()).optional(),
                published: z.boolean().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return createPost(input)
        }),

    getPost: t.procedure
        .input(
            z.object({
                id: z.number(),
                withRelations: trueOrUndefined.optional(),
                categories: trueOrUndefined.optional(),
                tags: trueOrUndefined.optional(),
            })
        )
        .query(async ({ input }) => {
            return getPost(input)
        }),

    getPosts: t.procedure
        .input(
            z.object({
                id: z.number().optional(),
                title: z.string().optional(),
                content: z.string().optional(),
                relations: z
                    .object({
                        all: trueOrUndefined.optional(),
                        categories: trueOrUndefined.optional(),
                        tags: trueOrUndefined.optional(),
                    })
                    .optional(),
                filters: z
                    .object({
                        category: z.string().optional(),
                        tag: z.string().optional(),
                    })
                    .optional(),
                limit: z.number().default(10),
                offset: z.number().default(0),
            })
        )
        .query(async ({ input }) => {
            return getPosts(input)
        }),

    updatePost: t.procedure
        .input(
            z.object({
                id: z.number(),
                data: z.object({
                    title: z.string().optional(),
                    content: z.string().optional(),
                    image: z.string().optional(),
                    published: z.boolean().optional(),
                    categories: z.array(z.string()).optional(),
                    tags: z.array(z.string()).optional(),
                }),
            })
        )
        .mutation(async ({ input }) => {
            return updatePost(input)
        }),

    deleteRecords: t.procedure
        .input(
            z.object({
                tableKey: z.enum(['posts', 'categories', 'tags']),
                ids: z.array(z.number()),
            })
        )
        .mutation(async ({ input }) => {
            return deleteRecords({ tableKey: input.tableKey, ids: input.ids })
        }),
})

/** ============================
 *      HELPER FUNCTIONS
 *  ============================ */

/**
 * `healthCheck`
 * Performs a health check for the application and its dependencies.
 *
 * @returns An object containing the health status, uptime, and dependencies status
 */
async function healthCheck() {
    try {
        const post = await getPosts({ limit: 1 })
        const dbStatus = post ? 'connected' : 'disconnected'

        return {
            status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
            uptime: process.uptime(),
            dependencies: {
                database: dbStatus,
            },
            timestamp: new Date().toISOString(),
        }
    } catch (error) {
        console.error('Health check error:', error)
        return {
            status: 'unhealthy',
            uptime: process.uptime(),
            dependencies: {
                database: 'disconnected',
            },
            timestamp: new Date().toISOString(),
            error,
        }
    }
}

/**
 * `findOrCreateRecords`
 * Finds existing records by name and creates missing ones.
 *
 * @param tx The current database transaction
 * @param tableKey The key of the table (e.g., `'categories'`, `'tags'`) to operate on
 * @param names Array of string names to find or create
 * @returns An array of all records matching the provided names
 * @throws Error if the query fails
 */
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

    const existingRecordNames = new Set(
        existingRecords.map((record) => record.name)
    )
    const newRecordNames = names.filter(
        (name) => !existingRecordNames.has(name)
    )

    if (!newRecordNames.length) return existingRecords

    const newRecords = await tx
        .insert(table)
        .values(newRecordNames.map((name) => ({ name })))
        .onConflictDoNothing({ target: table.name })
        .returning({ id: table.id, name: table.name })

    return [...existingRecords, ...newRecords]
}

/**
 * `relatePostToRecords`
 * Inserts bridging rows between a post and its `categories` or `tags`.
 *
 * @param tx The current database transaction
 * @param postRelationFields Array of `post-to-category` or `post-to-tag` objects
 * @param table Drizzle schema reference for either `postsToCategories` or `postsToTags`
 * @returns The result of the insert operation (array of inserted rows, if any)
 * @throws Error if `postRelationFields` is empty
 */
async function relatePostToRecords({
    tx,
    postRelationFields,
    table,
}: RelatePostToRecordsArgs) {
    if (!postRelationFields.length) {
        throw new Error('postRelationFields cannot be empty')
    }
    return await tx.insert(table).values(postRelationFields)
}

/** ============================
 *       CRUD FUNCTIONS
 *  ============================ */

/**
 * `createPost`
 * Creates a new post, optionally with related `categories` or `tags`.
 * Automatically bridges `tags-to-categories` if both are present.
 *
 * @param title The title of the post
 * @param content The main content of the post
 * @param categories Optional array of category names
 * @param tags Optional array of tag names
 * @param additionalFields Any additional fields for the post schema
 * @returns The newly created post record
 * @throws Error if `title` or `content` is missing, or if the DB insert fails
 */
export async function createPost({
    title,
    content,
    image,
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
                .values({ title, content, image, ...additionalFields })
                .returning({ id: schema.posts.id })

            const postId = newPost.id
            const categoryRecords: Category[] = []
            const tagRecords: Tag[] = []

            if (categories.length) {
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

            if (tags.length) {
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

            if (categoryRecords.length && tagRecords.length) {
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

/**
 * `getPost`
 * Retrieves a single post by `id`.
 * Includes bridging data if requested.
 *
 * @param id Numeric ID of the post
 * @param withRelations If `true`, returns bridging info for both categories and tags
 * @param categories If `true`, returns bridging info for categories only
 * @param tags If `true`, returns bridging info for tags only
 * @returns An array of posts matching the given filters
 * @throws Error if the DB query fails
 */
export async function getPost({
    id,
    withRelations,
    categories,
    tags,
}: GetPostArgs) {
    try {
        const result = await db.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
            with: {
                postsToCategories: (withRelations || categories) && {
                    with: {
                        category: true,
                    },
                },
                postsToTags: (withRelations || tags) && {
                    with: {
                        tag: true,
                    },
                },
            },
        })

        if (!result) return

        const postCategories = Array.isArray(result.postsToCategories)
            ? result.postsToCategories
                  .map(
                      (rel) =>
                          'category' in rel &&
                          (rel.category ? rel.category.name : false)
                  )
                  .filter((name): name is string => Boolean(name))
            : []

        const postTags = Array.isArray(result.postsToTags)
            ? result.postsToTags
                  .map(
                      (rel) => 'tag' in rel && (rel.tag ? rel.tag.name : false)
                  )
                  .filter((name): name is string => Boolean(name))
            : []

        return {
            ...result,
            created_at_formatted: new Date(
                result.created_at
            ).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            updated_at_formatted: result.updated_at
                ? new Date(result.updated_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                  })
                : null,
            categories: postCategories,
            tags: postTags,
        }
    } catch (error) {
        console.error('Failed to get post(s)', { error })
        throw new Error('Failed to get post(s)')
    }
}

/**
 * `getPosts`
 * Retrieves posts optionally filtered by `id`, `title`, or `content`.
 * Includes bridging data if requested.
 *
 * @param id Optional numeric ID of the post
 * @param title Optional title substring match
 * @param content Optional content substring match
 * @param withRelations If `true`, returns bridging info for both categories and tags
 * @param categories If `true`, returns bridging info for categories only
 * @param tags If `true`, returns bridging info for tags only
 * @param limit Number of rows to return (default: `10`)
 * @param offset Starting row offset (default: `0`)
 * @returns An array of posts matching the given filters
 * @throws Error if the DB query fails
 */
export async function getPosts({
    ids,
    title,
    content,
    relations = {},
    filters = {},
    limit = 10,
    offset = 0,
}: GetPostsArgs = {}) {
    const { all, categories, tags } = relations
    const { category: filterCategory, tag: filterTag } = filters

    try {
        const result = await db.query.posts.findMany({
            where: (posts, { and, exists, ilike, inArray, or }) => {
                const andConditions = [eq(posts.published, true)]
                if (ids) andConditions.push(inArray(posts.id, ids))

                if (filterCategory?.length) {
                    const categorySubquery = db
                        .select()
                        .from(schema.postsToCategories)
                        .innerJoin(
                            schema.categories,
                            eq(
                                schema.postsToCategories.categoryId,
                                schema.categories.id
                            )
                        )
                        .where(
                            and(
                                eq(schema.postsToCategories.postId, posts.id),
                                eq(schema.categories.name, filterCategory)
                            )
                        )
                    andConditions.push(exists(categorySubquery))
                }

                if (filterTag?.length) {
                    const tagSubquery = db
                        .select()
                        .from(schema.postsToTags)
                        .innerJoin(
                            schema.tags,
                            eq(schema.postsToTags.tagId, schema.tags.id)
                        )
                        .where(
                            and(
                                eq(schema.postsToTags.postId, posts.id),
                                eq(schema.tags.name, filterTag)
                            )
                        )
                    andConditions.push(exists(tagSubquery))
                }

                const orConditions = []
                if (title) orConditions.push(ilike(posts.title, `%${title}%`))
                if (content)
                    orConditions.push(ilike(posts.content, `%${content}%`))

                return and(...andConditions, or(...orConditions))
            },
            with: {
                postsToCategories: (all || categories) && {
                    with: {
                        category: true,
                    },
                },
                postsToTags: (all || tags) && {
                    with: {
                        tag: true,
                    },
                },
            },
            limit,
            offset,
            orderBy: (posts, { desc }) => [desc(posts.created_at)],
        })

        if (!result) {
            console.error('Query returned no results.')
            return []
        }

        return result.map((post) => {
            const postCategories = Array.isArray(post.postsToCategories)
                ? post.postsToCategories
                      .map((rel) =>
                          'category' in rel && rel.category
                              ? rel.category.name
                              : false
                      )
                      .filter((name): name is string => Boolean(name))
                : false

            const postTags = Array.isArray(post.postsToTags)
                ? post.postsToTags
                      .map((rel) =>
                          'tag' in rel && rel.tag ? rel.tag.name : false
                      )
                      .filter((name): name is string => Boolean(name))
                : false

            return {
                ...post,
                created_at_formatted: new Date(
                    post.created_at
                ).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                updated_at_formatted: post.updated_at
                    ? new Date(post.updated_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                      })
                    : null,
                categories: postCategories,
                tags: postTags,
            }
        })
    } catch (error) {
        console.error('Failed to get post(s)', { error })
        throw new Error('Failed to get post(s)')
    }
}

/**
 * `updatePost`
 * Updates an existing post and replaces its bridging rows for `categories` or `tags`.
 *
 * @param id Unique ID of the post to update
 * @param data Object containing any new post fields and optional `categories` or `tags`
 * @returns An object containing the post `id` that was updated
 * @throws Error if the DB update fails
 */
export async function updatePost({ id, data }: UpdatePostArgs) {
    try {
        return await db.transaction(async (tx) => {
            const { categories, tags, ...additionalFields } = data

            if (Object.keys(additionalFields).length) {
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

                if (Array.isArray(categories)) {
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

                if (Array.isArray(tags)) {
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

            if (categoryRecords.length && tagRecords.length) {
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

/**
 * `deleteRecords`
 * Deletes records from a specified table by their IDs.
 *
 * @param tableKey The key of the table (e.g., `'posts'`, `'categories'`, `'tags'`) to operate on
 * @param ids Array of numeric IDs to delete
 * @returns The result of the delete operation (e.g., the number of rows deleted)
 * @throws Error if the DB delete fails
 */
export async function deleteRecords({ tableKey, ids }: DeleteRecordsArgs) {
    const table = schema[tableKey]
    try {
        return await db.delete(table).where(inArray(table.id, ids))
    } catch (error) {
        console.error('Failed to delete record(s)', { error })
        throw new Error('Failed to delete record(s)')
    }
}
