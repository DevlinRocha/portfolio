import { createLazyFileRoute } from '@tanstack/react-router'
import { trpc } from '@/api/trpcClient'
import BlogCard from '@/components/BlogCard'
import DefaultNotFound from '@/components/DefaultNotFound'

export const Route = createLazyFileRoute('/blog/')({
    component: Blog,
})

function Blog() {
    const { data, isLoading, error } = trpc.getPosts.useQuery({
        withRelations: true,
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <DefaultNotFound />
    if (!data || !data.length) return <DefaultNotFound />

    const firstPost = data[0]

    return (
        <main
            itemScope
            itemType="https://schema.org/Blog"
            className="flex h-full w-full flex-col items-center gap-[52px] bg-neutral-100 pb-24 md:pb-32 lg:pb-36"
        >
            <header className="w-full max-w-[2560px] bg-purple-600 py-14 text-center">
                <h1
                    className="font-display text-5xl text-white"
                    itemProp="headline"
                >
                    Blog
                </h1>
            </header>

            <ul
                itemProp="mainEntity"
                className="flex w-[87.5lvw] max-w-[992px] flex-col flex-wrap gap-8 sm:flex-row"
            >
                <li
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                    className="group overflow-clip rounded-2xl bg-white lg:max-h-[538px]"
                    key={firstPost.id}
                >
                    <BlogCard
                        id={firstPost.id}
                        title={firstPost.title}
                        image={firstPost.image}
                        categories={firstPost.categories}
                        tags={firstPost.tags}
                        created_at={firstPost.created_at}
                        updated_at={
                            firstPost.updated_at || firstPost.created_at
                        }
                        created_at_formatted={firstPost.created_at_formatted}
                        featured
                    />
                </li>

                {data.slice(1).map((post) => {
                    return (
                        <li
                            itemType="https://schema.org/BlogPosting"
                            className="group overflow-clip rounded-2xl bg-white md:w-[calc(50%-16px)] lg:max-h-[538px]"
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
                            />
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}
