import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './db/schema'
import { InferSelectModel, eq } from 'drizzle-orm'

type Post = InferSelectModel<typeof schema.posts>

type PostWithRelations = Partial<Post> & {
    categories?: string[]
    tags?: string[]
}

const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL,
    },
    schema,
    casing: 'snake_case',
})

export async function createPost(data: PostWithRelations) {
    const { title, content, categories = [], tags = [], ...rest } = data

    if (!title || !content) {
        throw new Error('Missing title and/or content')
    }

    const result = await db.transaction(async (tx) => {
        const [newPost] = await tx
            .insert(schema.posts)
            .values({
                title,
                content,
                ...rest,
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
