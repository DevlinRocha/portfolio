import { trpc } from '@/api/trpcClient'
import BlogCard from '@/components/BlogCard'
import DefaultNotFound from '@/components/DefaultNotFound'
import { createFileRoute } from '@tanstack/react-router'

type BlogSearchParams = {
    query?: string
    category?: string
}

export const Route = createFileRoute('/blog/search')({
    validateSearch: (search): BlogSearchParams => {
        const query = search.query ? String(search.query).trim() : undefined
        const category = search.category
            ? String(search.category).trim()
            : undefined

        return {
            query,
            category,
        }
    },
    component: BlogSearch,
})

function BlogSearch() {
    const { query, category } = Route.useSearch({})

    const {
        data: posts,
        isLoading,
        error,
    } = trpc.getPosts.useQuery({
        title: query,
        content: query,
        filterCategory: category,
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
                    className="font-display text-2xl md:text-3xl"
                    itemProp="headline"
                >
                    Search Blog
                </h1>
            </header>

            <h2 className="w-[87.5lvw] max-w-[992px] text-left text-xs font-semibold text-neutral-500">
                {posts.length} results found for{' '}
                <span className="text-zinc-900">{query}</span>
            </h2>

            <ul
                itemProp="mainEntity"
                className="flex w-[87.5lvw] max-w-[992px] flex-col flex-wrap gap-8 sm:flex-row"
            >
                {posts.map((post) => {
                    return (
                        <li
                            itemType="https://schema.org/BlogPosting"
                            className="group overflow-clip rounded-2xl bg-white lg:max-h-[538px]"
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
