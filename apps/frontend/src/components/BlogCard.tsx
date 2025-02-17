import { useState } from 'react'
import { Link } from '@tanstack/react-router'

type BlogCardProps = {
    id: number
    title: string
    image?: string | null
    categories: boolean | string[]
    tags: boolean | string[]
    created_at: string
    updated_at: string
    created_at_formatted: string
    featured?: boolean
}

export default function BlogCard({
    id,
    title,
    image,
    categories,
    tags,
    created_at,
    updated_at,
    created_at_formatted,
    featured,
}: BlogCardProps) {
    const [loading, setLoading] = useState(true)

    const hasCategories = Array.isArray(categories) && categories.length > 0
    const hasTags = Array.isArray(tags) && tags.length > 0

    function handleLoad() {
        setLoading(false)
    }

    return (
        <Link
            className={`flex h-full w-full ${featured ? 'flex-col md:flex-row' : 'flex-col'}`}
            to={`/blog/${id}`}
            draggable={false}
        >
            <meta itemProp="datePublished" content={created_at} />
            <meta itemProp="dateModified" content={updated_at} />
            <meta itemProp="author" content="Devlin Rocha" />

            <img
                src={image || undefined}
                width={1920}
                height={1080}
                draggable={false}
                // alt={image.alt}
                onLoad={handleLoad}
                className={`group-hover:scale-101 h-40 bg-neutral-50 object-contain transition-transform duration-500 sm:h-[188px] ${loading && image ? 'animate-pulse' : 'animate-none'} ${featured ? 'md:h-[255px] lg:h-[362px]' : 'lg:h-[270px]'}`}
            />

            <div className="flex h-full w-full select-none flex-col gap-2 p-6 text-xs font-bold text-gray-500 lg:gap-3 lg:p-8 lg:text-sm">
                <div className="flex gap-1">
                    {hasCategories &&
                        categories.map((category) => (
                            <span key={category}>{category}</span>
                        ))}
                    {hasCategories && hasTags && <span>|</span>}
                    {hasTags && tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>

                <h2
                    className={`font-serif text-xl text-black ${featured ? 'line-clamp-6 lg:text-3xl' : 'line-clamp-5 lg:text-2xl'}`}
                >
                    {title}
                </h2>

                <time
                    itemProp="datePublished"
                    dateTime={created_at}
                    className="mt-1 flex flex-1 items-end text-sm font-semibold leading-5 lg:text-base lg:leading-5"
                >
                    {created_at_formatted}
                </time>
            </div>
        </Link>
    )
}
