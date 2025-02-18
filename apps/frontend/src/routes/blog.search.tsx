import { trpc } from '@/api/trpcClient'
import BlogCard from '@/components/BlogCard'
import DefaultNotFound from '@/components/DefaultNotFound'
import { createFileRoute } from '@tanstack/react-router'

type BlogSearchParams = {
    query?: string
    category?: string
    tag?: string
}

export const Route = createFileRoute('/blog/search')({
    validateSearch: (search): BlogSearchParams => {
        const query = search.query ? String(search.query).trim() : undefined
        const category = search.category
            ? String(search.category).trim()
            : undefined
        const tag = search.tag ? String(search.tag).trim() : undefined

        return {
            query,
            category,
            tag,
        }
    },
    component: BlogSearch,
})

function BlogSearch() {
    const { query, category, tag } = Route.useSearch({})

    const {
        data: posts,
        isLoading,
        error,
    } = trpc.getPosts.useQuery({
        title: query,
        content: query,
        filterCategory: category,
        filterTag: tag,
        withRelations: true,
    })

    if (isLoading)
        return (
            <h2 className="animate-pulse py-14 pb-24 text-center italic text-neutral-500 md:pb-32 lg:pb-36">
                Loading...
            </h2>
        )
    if (error) return <DefaultNotFound />
    if (!posts) return <DefaultNotFound />

    return (
        <main
            itemScope
            itemType="https://schema.org/Blog"
            className="flex h-full w-full flex-col items-center gap-4 bg-neutral-100 pb-24 md:pb-32 lg:gap-6 lg:pb-36"
        >
            <header className="mt-8 w-[87.5lvw] max-w-[992px] text-left md:mt-10 lg:mt-[52px]">
                <h1
                    className="text-2xl font-bold md:text-3xl"
                    itemProp="headline"
                >
                    Search Blog
                </h1>
            </header>

            <h2 className="w-[87.5lvw] max-w-[992px] text-left text-xs font-semibold text-neutral-500">
                {posts.length} results found for{' '}
                <span className="text-zinc-900">
                    {query || category || tag}
                </span>
            </h2>

            <ul
                itemProp="mainEntity"
                className="flex w-[87.5lvw] max-w-[992px] flex-col flex-wrap gap-8 sm:flex-row"
            >
                {posts.map((post) => {
                    return (
                        <li
                            itemType="https://schema.org/BlogPosting"
                            className="group rounded-2xl bg-white lg:max-h-[538px]"
                            key={post.id}
                        >
                            <BlogCard
                                id={post.id}
                                title={post.title}
                                image={post.image}
                                categories={post.categories}
                                tags={post.tags}
                                created_at={post.created_at}
                                updated_at={post.updated_at || post.created_at}
                                created_at_formatted={post.created_at_formatted}
                                featured
                            />
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}
