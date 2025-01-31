import { createLazyFileRoute } from '@tanstack/react-router'
import { trpc } from '@/api/trpcClient'
import DefaultNotFound from '@/components/DefaultNotFound'

export const Route = createLazyFileRoute('/blog/$blogId')({
    component: BlogPost,
})

function BlogPost() {
    const { blogId } = Route.useParams()

    const {
        data: post,
        isLoading,
        error,
    } = trpc.getPost.useQuery(
        {
            id: Number(blogId),
            withRelations: true,
        },
        {
            enabled: !Number.isNaN(Number(blogId)),
        }
    )

    if (isLoading) return <div>Loading...</div>
    if (error) return <DefaultNotFound />
    if (!post) return <DefaultNotFound />

    return (
        <main className="flex flex-col">
            <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className="relative flex h-full w-full flex-col items-center gap-5 pb-24 md:pb-32 lg:pb-36"
            >
                <header className="flex w-full max-w-[2560px] justify-center bg-purple-600 py-14 text-center">
                    <h1
                        itemProp="headline"
                        className="font-display w-full max-w-[820px] text-pretty break-words px-8 text-3xl text-white md:text-4xl lg:text-5xl"
                    >
                        {post.title}
                    </h1>
                </header>

                <meta itemProp="datePublished" content={post.created_at} />
                <meta
                    itemProp="dateModified"
                    content={post.updated_at || post.created_at}
                />
                <meta itemProp="author" content="Devlin Rocha" />

                <div className="mt-3 flex w-[87.5lvw] max-w-prose flex-col gap-8 md:mt-5 md:gap-9 lg:mt-8 lg:gap-11">
                    <section className="flex flex-col gap-1 text-xs font-bold text-gray-500">
                        <div className="flex h-full w-full gap-1 text-xs font-bold">
                            <ul className="flex gap-1">
                                {Array.isArray(post.categories) &&
                                    post.categories.map((category) => (
                                        <li key={category}>{category}</li>
                                    ))}
                            </ul>
                            |
                            <ul className="flex gap-1">
                                {Array.isArray(post.tags) &&
                                    post.tags.map((tag) => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                            </ul>
                        </div>

                        <time
                            itemProp="datePublished"
                            dateTime={post.created_at}
                            className="flex flex-1 items-end text-sm font-semibold leading-5"
                        >
                            {post.created_at_formatted}
                        </time>
                    </section>

                    {post.image && (
                        <figure className="w-lvw max-w-prose place-self-center">
                            <img
                                src={post.image}
                                className="w-full object-contain sm:rounded-2xl"
                            />
                        </figure>
                    )}

                    <section
                        itemProp="articleBody"
                        className="2xs:text-base 2xs:leading-7 flex flex-col gap-2 text-sm leading-7"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        </main>
    )
}
