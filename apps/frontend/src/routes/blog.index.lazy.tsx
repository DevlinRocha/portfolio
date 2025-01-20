import { createLazyFileRoute } from '@tanstack/react-router'
import { trpc } from '@/api/trpcClient'
import BlogCard from '@/components/BlogCard'

export const Route = createLazyFileRoute('/blog/')({
    component: Blog,
})

function Blog() {
    const { data, isLoading, error } = trpc.getPosts.useQuery({
        withRelations: true,
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>No data found</div>

    const firstPost = data[0]

    return (
        <main className="flex h-full w-full flex-col items-center gap-[52px] bg-neutral-100 pb-24 md:pb-32 lg:pb-36">
            <header className="w-full max-w-[2560px] bg-purple-600 py-14 text-center">
                <h1 className="font-display text-5xl text-white">Blog</h1>
            </header>

            <ul className="flex w-[87.5lvw] max-w-[992px] flex-col flex-wrap gap-8 sm:flex-row">
                <li
                    className="group overflow-clip rounded-2xl bg-white lg:max-h-[538px]"
                    key={firstPost.id}
                >
                    <BlogCard
                        id={firstPost.id}
                        title={firstPost.title}
                        categories={firstPost.categories}
                        tags={firstPost.tags}
                        created_at={firstPost.created_at}
                    />
                </li>

                {data.slice(1).map((post) => {
                    return (
                        <li
                            className="group overflow-clip rounded-2xl bg-white sm:w-[calc(50%-16px)] lg:max-h-[538px]"
                            key={post.id}
                        >
                            <BlogCard
                                id={post.id}
                                title={post.title}
                                categories={post.categories}
                                tags={post.tags}
                                created_at={post.created_at}
                            />
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}
