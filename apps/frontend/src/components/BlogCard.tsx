import { useState } from 'react'
import { Link } from '@tanstack/react-router'

type BlogCardProps = {
    id: number
    title: string
    image?: string | null
    categories: boolean | string[]
    tags: boolean | string[]
    created_at: string
    featured?: boolean
}

export default function BlogCard({
    id,
    title,
    image,
    categories,
    tags,
    created_at,
    featured,
}: BlogCardProps) {
    const [loading, setLoading] = useState(true)

    function handleLoad() {
        setLoading(false)
    }

    return (
        <Link
            className={`flex h-full w-full ${featured ? 'flex-col md:flex-row' : 'flex-col'}`}
            to={`/blog/${id}`}
            draggable={false}
        >
            <img
                src={image || undefined}
                width={1920}
                height={1080}
                draggable={false}
                // alt={image.alt}
                onLoad={handleLoad}
                className={`group-hover:scale-101 h-40 rounded-t-2xl bg-neutral-600 object-contain transition-transform duration-500 sm:h-[188px] ${loading && image ? 'animate-loading' : 'animate-none'} ${featured ? 'md:h-[255px] lg:h-[362px]' : 'lg:h-[270px]'}`}
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

                <h2
                    className={`font-serif text-xl text-black ${featured ? 'line-clamp-6 lg:text-3xl' : 'line-clamp-5 lg:text-2xl'}`}
                >
                    {title}
                </h2>

                <time className="mt-1 flex flex-1 items-end text-sm font-semibold leading-5 lg:text-base lg:leading-5">
                    {created_at}
                </time>
            </div>
        </Link>
    )
}
