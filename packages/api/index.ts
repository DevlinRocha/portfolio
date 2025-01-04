import { PrismaClient, Post } from '@prisma/client'

const prisma = new PrismaClient()

type PostWithRelations = Partial<Post> & {
    categories?: string[]
    tags?: string[]
}

async function safeExecute<T>(
    operation: Promise<T>,
    errorMessage: string,
    context?: Record<string, unknown>
): Promise<T> {
    try {
        return await operation
    } catch (error) {
        handleError(errorMessage, error, context)
    }
}

function handleError(
    message: string,
    error?: unknown,
    context?: Record<string, unknown>
): never {
    console.error(`Error: ${message}:`, { error, ...context })
    throw new Error(`Error: ${message}`)
}

async function prepareRelations(
    names: string[] | undefined,
    model: PrismaClient['category'] | PrismaClient['tag']
) {
    if (!names || names.length === 0) return undefined

    const existing = await (
        model as PrismaClient['category'] & PrismaClient['tag']
    ).findMany({
        where: { name: { in: names } },
    })

    const existingNames = new Set(existing.map((data) => data.name))
    const toCreate = names.filter((name) => !existingNames.has(name))

    return {
        connect: existing.map((item) => ({ id: item.id })),
        create: toCreate.map((name) => ({ name })),
    }
}

export async function createPost(
    data: Pick<Post, 'title' | 'content'> &
        Partial<Omit<Post, 'title' | 'content'>> & {
            categories?: string[]
            tags?: string[]
        }
) {
    const { categories, tags, ...rest } = data

    const post = await safeExecute(
        prisma.post.create({
            data: {
                ...rest,
                categories: await prepareRelations(categories, prisma.category),
                tags: await prepareRelations(tags, prisma.tag),
            },
            include: { categories: !!categories, tags: !!tags },
        }),
        'Failed to create post'
    )

    return post
}

export async function getPosts(
    includeRelations = true,
    { id, categories, tags }: PostWithRelations = {}
) {
    const include = includeRelations
        ? { categories: true, tags: true }
        : undefined

    if (id) {
        return await safeExecute(
            prisma.post.findUnique({
                where: { id },
                include,
            }),
            'Failed to get post'
        )
    }

    const where: {
        categories?: { some: { name: { in: string[] } } }
        tags?: { some: { name: { in: string[] } } }
    } = {}

    if (categories && categories.length > 0) {
        where.categories = {
            some: {
                name: { in: categories },
            },
        }
    }

    if (tags && tags.length > 0) {
        where.tags = {
            some: {
                name: { in: tags },
            },
        }
    }

    const posts = await safeExecute(
        prisma.post.findMany({
            where,
            include,
        }),
        'Failed to get post(s)'
    )

    return posts
}

/**
 * Updates a previous post with new data, including categories and tags
 * @param id ID of post to be updated
 * @param data Data to be updated
 * @returns Updated post
 */
export async function updatePost(
    id: string,
    data: PostWithRelations,
    includeRelations = false
) {
    const { categories, tags, ...rest } = data

    const include = includeRelations
        ? { categories: true, tags: true }
        : { categories: !!categories, tags: !!tags }

    if (!categories && !tags) {
        const post = await safeExecute(
            prisma.post.update({
                where: { id },
                data: rest,
                include,
            }),
            'Failed to update post',
            { id }
        )

        return post
    }

    const post = await safeExecute(
        prisma.$transaction(async (tx) => {
            await tx.post.update({
                where: { id },
                data: {
                    ...rest,
                    categories: await prepareRelations(
                        categories,
                        prisma.category
                    ),
                    tags: await prepareRelations(tags, prisma.tag),
                },
                include,
            })
        }),
        'Failed to update post',
        { id }
    )

    return post
}

/**
 * Updates multiple previous posts with new data
 * @param ids ID's of posts to be updated
 * @param data Data to be updated
 * @returns Array of updated posts
 */
export async function updatePosts(
    ids: string[],
    data: PostWithRelations,
    includeRelations = false
) {
    const { categories, tags, ...rest } = data

    const include = includeRelations
        ? { categories: true, tags: true }
        : { categories: !!categories, tags: !!tags }

    if (!categories && !tags) {
        const posts = await safeExecute(
            prisma.post.updateMany({
                where: { id: { in: ids } },
                data: data,
            }),
            'Failed to update post(s)'
        )

        return posts
    }

    const relatedCategories = await prepareRelations(
        categories,
        prisma.category
    )
    const relatedTags = await prepareRelations(tags, prisma.tag)

    const posts = await safeExecute(
        prisma.$transaction(
            ids.map((id) =>
                prisma.post.update({
                    where: { id },
                    data: {
                        ...rest,
                        categories: relatedCategories,
                        tags: relatedTags,
                    },
                    include,
                })
            )
        ),
        'Failed to update post(s)'
    )

    return posts
}

export async function deletePosts(ids: string[]) {
    if (ids.length === 0) handleError('No post ID(s) provided')

    const posts = await safeExecute(
        prisma.post.deleteMany({
            where: { id: { in: ids } },
        }),
        'Failed to delete post(s)'
    )

    return posts
}

async function init() {
    try {
        await prisma.$disconnect()
    } catch (error) {
        await prisma.$disconnect()
        process.exit(1)
        handleError('Error', error)
    }
}

init()
