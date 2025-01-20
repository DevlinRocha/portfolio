import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { trpc } from '@/api/trpcClient'
import { useState } from 'react'

export const Route = createLazyFileRoute('/blog/')({
    component: Blog,
})

function Blog() {
    const [loading, setLoading] = useState(true)

    const { data, isLoading, error } = trpc.getPosts.useQuery({
        withRelations: true,
    })

    function handleLoad() {
        setLoading(false)
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>No data found</div>

    const firstPost = data[0]
    if (!firstPost) return

    return (
        <main className="flex h-full w-full flex-col items-center gap-[52px] bg-neutral-100 pb-24 md:pb-32 lg:pb-36">
            <header className="w-full max-w-[2560px] bg-purple-600 py-14 text-center">
                <h1 className="font-display text-5xl text-white">Blog</h1>
            </header>

            <ul className="flex w-[87.5lvw] max-w-[992px] flex-col flex-wrap gap-8 sm:flex-row">
                {data.slice(0).map((post) => {
                    return (
                        <li
                            className="group overflow-clip rounded-2xl bg-white sm:w-[calc(50%-16px)] lg:max-h-[538px]"
                            key={post.id}
                        >
                            <Link
                                className="flex h-full w-full flex-col"
                                to={`/blog/${post.id}`}
                                draggable={false}
                            >
                                <img
                                    src="https://images.devlin.workers.dev/CSS-@media-queries.jpg"
                                    width={1920}
                                    height={1080}
                                    draggable={false}
                                    // alt={post.image.alt}
                                    onLoad={handleLoad}
                                    className={`group-hover:scale-101 h-40 rounded-t-2xl bg-neutral-600 object-contain transition-transform duration-500 sm:h-[188px] lg:h-[270px] ${loading ? 'animate-loading' : 'animate-none'}`}
                                />

                                <div className="flex h-full w-full select-none flex-col gap-2 p-6 text-xs font-bold text-gray-500 lg:gap-3 lg:p-8 lg:text-sm">
                                    <div className="flex gap-1">
                                        {Array.isArray(post.categories) &&
                                            post.categories.map(
                                                (category, index) => (
                                                    <span key={index}>
                                                        {category}
                                                    </span>
                                                )
                                            )}
                                        |
                                        {Array.isArray(post.tags) &&
                                            post.tags.map((tag, index) => (
                                                <span key={index}>{tag}</span>
                                            ))}
                                    </div>

                                    <h2 className="line-clamp-5 font-serif text-xl text-black lg:text-2xl">
                                        {post.title}
                                    </h2>

                                    <span className="mt-1 flex flex-1 items-end text-sm font-semibold leading-5 lg:text-base lg:leading-5">
                                        {new Date(
                                            post.created_at
                                        ).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}
