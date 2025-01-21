import { createLazyFileRoute } from '@tanstack/react-router'
import { trpc } from '@/api/trpcClient'

export const Route = createLazyFileRoute('/blog/$blogId')({
    component: BlogPost,
})

function BlogPost() {
    const { blogId } = Route.useParams()

    const {
        data: post,
        isLoading,
        error,
    } = trpc.getPost.useQuery({
        id: Number(blogId),
        withRelations: true,
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!post) return

    return (
        <main className="flex flex-col">
            <article className="relative flex h-full w-full flex-col items-center gap-5 pb-24 md:pb-32 lg:pb-36">
                <header className="flex w-full max-w-[2560px] justify-center bg-purple-600 py-14 text-center">
                    <h1 className="font-display w-full max-w-[820px] text-pretty break-words px-8 text-3xl text-white">
                        {post.title}
                    </h1>
                </header>

                <div className="flex w-[87.5lvw] max-w-prose flex-col gap-5">
                    <section className="mb-3 mt-3 flex flex-col gap-1 text-xs font-bold text-gray-500">
                        <div className="flex h-full w-full gap-1 text-xs font-bold lg:gap-3 lg:text-sm">
                            <ul className="flex gap-1">
                                {Array.isArray(post.categories) &&
                                    post.categories.map((category, index) => (
                                        <li key={index}>{category}</li>
                                    ))}
                            </ul>
                            |
                            <ul className="flex gap-1">
                                {Array.isArray(post.tags) &&
                                    post.tags.map((tag, index) => (
                                        <li key={index}>{tag}</li>
                                    ))}
                            </ul>
                        </div>

                        <time className="mt-1 flex flex-1 items-end text-sm font-semibold leading-5 lg:text-base lg:leading-5">
                            {new Date(post.created_at).toLocaleDateString(
                                undefined,
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </time>
                    </section>

                    <section
                        className="2xs:text-base 2xs:leading-7 flex flex-col gap-2 text-sm leading-7"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        </main>
    )
}
