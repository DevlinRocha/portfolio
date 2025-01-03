import { relations } from 'drizzle-orm'
import { pgTable, integer, text, boolean, timestamp } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    title: text().notNull(),
    content: text().notNull(),
    published: boolean().default(false).notNull(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp(),
    deleted_at: timestamp(),
})

export const postsRelations = relations(posts, ({ many }) => ({
    postsToCategories: many(postsToCategories),
    postsToTags: many(postsToTags),
}))

export const categories = pgTable('categories', {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: text().unique().notNull(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
    postsToCategories: many(postsToCategories),
    tagsToCategories: many(tagsToCategories),
}))

export const postsToCategories = pgTable(
    'posts_to_categories',
    {
        postId: integer()
            .notNull()
            .references(() => posts.id),
        categoryId: integer()
            .notNull()
            .references(() => categories.id),
    },
    (table) => [table.postId, table.categoryId]
)

export const postsToCategoriesRelations = relations(
    postsToCategories,
    ({ one }) => ({
        post: one(posts, {
            fields: [postsToCategories.postId],
            references: [posts.id],
        }),
        category: one(categories, {
            fields: [postsToCategories.categoryId],
            references: [categories.id],
        }),
    })
)

export const tags = pgTable('tags', {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: text().unique().notNull(),
})

export const tagsRelations = relations(tags, ({ many }) => ({
    postsToTags: many(postsToTags),
    tagsToCategories: many(tagsToCategories),
}))

export const postsToTags = pgTable(
    'posts_to_tags',
    {
        postId: integer()
            .notNull()
            .references(() => posts.id),
        tagId: integer()
            .notNull()
            .references(() => tags.id),
    },
    (table) => [table.postId, table.tagId]
)

export const postsToTagsRelations = relations(postsToTags, ({ one }) => ({
    tag: one(tags, {
        fields: [postsToTags.tagId],
        references: [tags.id],
    }),
    post: one(posts, {
        fields: [postsToTags.postId],
        references: [posts.id],
    }),
}))

export const tagsToCategories = pgTable(
    'tags_to_categories',
    {
        tagId: integer()
            .notNull()
            .references(() => tags.id),
        categoryId: integer()
            .notNull()
            .references(() => categories.id),
    },
    (table) => [table.tagId, table.categoryId]
)

export const tagsToCategoriesRelations = relations(
    tagsToCategories,
    ({ one }) => ({
        tag: one(tags, {
            fields: [tagsToCategories.tagId],
            references: [tags.id],
        }),
        category: one(categories, {
            fields: [tagsToCategories.categoryId],
            references: [categories.id],
        }),
    })
)
