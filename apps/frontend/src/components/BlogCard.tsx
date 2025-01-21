import { useState } from 'react'
import { Link } from '@tanstack/react-router'

type BlogCardProps = {
    id: number
    title: string
    categories: boolean | string[]
    tags: boolean | string[]
    created_at: string
}

export default function BlogCard({
    id,
    title,
    categories,
    tags,
    created_at,
}: BlogCardProps) {
    const [loading, setLoading] = useState(true)

    function handleLoad() {
        setLoading(false)
    }

    return (
        <Link
            className="flex h-full w-full flex-col"
            to={`/blog/${id}`}
            draggable={false}
        >
            <img
                src="https://images.devlin.workers.dev/CSS-@media-queries.jpg"
                // TODO: support images
                // src={image.src}
                width={1920}
                height={1080}
                draggable={false}
                // alt={image.alt}
                onLoad={handleLoad}
                className={`group-hover:scale-101 h-40 rounded-t-2xl bg-neutral-600 object-contain transition-transform duration-500 sm:h-[188px] lg:h-[270px] ${loading ? 'animate-loading' : 'animate-none'}`}
            />

            <div className="flex h-full w-full select-none flex-col gap-2 p-6 text-xs font-bold text-gray-500 lg:gap-3 lg:p-8 lg:text-sm">
                <div className="flex gap-1">
                    {Array.isArray(categories) &&
                        categories.map((category, index) => (
                            <span key={index}>{category}</span>
                        ))}
                    |
                    {Array.isArray(tags) &&
                        tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                </div>

                <h2 className="line-clamp-5 font-serif text-xl text-black lg:text-2xl">
                    {title}
                </h2>

                <time className="mt-1 flex flex-1 items-end text-sm font-semibold leading-5 lg:text-base lg:leading-5">
                    {new Date(created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
            </div>
        </Link>
    )
}
