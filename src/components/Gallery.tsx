import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import Caret from './Caret'
import { slug } from '@/utilities/functions'

interface GalleryProps {
    items: GalleryItem[]
}

interface GalleryItem {
    src: string
    title: string
    description: string
}

function Gallery({ items }: GalleryProps) {
    const captions = useRef<(HTMLElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log(entries)
                        entry.target.classList.remove('opacity-0')
                    } else {
                        entry.target.classList.add('opacity-0')
                    }
                })
            },
            {
                threshold: 0.5,
            }
        )

        captions.current.forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => {
            captions.current.forEach((el) => {
                if (el) observer.unobserve(el)
            })
        }
    }, [])

    function handleClick(e: React.MouseEvent, direction: 'left' | 'right') {
        e.stopPropagation()

        const target = e.currentTarget as HTMLElement

        target?.parentElement?.previousElementSibling?.scrollBy(
            direction === 'left' ? -16 : 16,
            0
        )
    }

    return (
        <>
            <ul className="scrollbar-hide flex h-auto w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth">
                {items.map(
                    ({ src, title, description }: GalleryItem, index) => {
                        return (
                            <li
                                id={`${slug(title)}`}
                                key={index}
                                className="m-0 shrink-0 snap-center snap-always first:md:ml-[3lvw] last:md:mr-[3lvw] first:lg:ml-[13lvw] last:lg:mr-[13lvw] first:xl:ml-[19lvw] last:xl:mr-[19lvw] first:2xl:ml-[24lvw] last:2xl:mr-[24lvw] first:3xl:ml-[29lvw] last:3xl:mr-[29lvw] first:4xl:ml-[36lvw] last:4xl:mr-[36lvw]"
                            >
                                <Link hash={`${slug(title)}`} draggable={false}>
                                    <figure className="flex h-full flex-col items-center gap-10">
                                        <div className="flex h-full flex-col items-center gap-5 rounded-2xl bg-neutral-300 p-5 md:p-12 lg:gap-8">
                                            <img
                                                src={src}
                                                width={1920}
                                                height={1080}
                                                draggable={false}
                                                className="max-h-[50vh] w-fit max-w-[95lvw] object-contain"
                                            />

                                            <div
                                                ref={(item) =>
                                                    (captions.current[index] =
                                                        item)
                                                }
                                                className="flex w-[87.5lvw] max-w-[297px] flex-col items-center gap-5 transition-opacity duration-500 ease-out 2xs:max-w-[360px] xs:max-w-[432px] md:max-w-[648px] lg:gap-8"
                                            >
                                                <figcaption className="text-lg font-medium text-sky-500 underline underline-offset-8 md:text-xl lg:text-2xl">
                                                    {title}
                                                </figcaption>

                                                <p className="max-w-prose text-pretty text-lg lg:text-3xl">
                                                    {description}
                                                </p>
                                            </div>
                                        </div>
                                    </figure>
                                </Link>
                            </li>
                        )
                    }
                )}
            </ul>

            <div className="mb-4 flex gap-4">
                <Caret
                    onClick={(e) => handleClick(e, 'left')}
                    className="min-h-14 min-w-14 cursor-pointer"
                />

                <Caret
                    onClick={(e) => handleClick(e, 'right')}
                    className="min-h-14 min-w-14 -scale-x-100 cursor-pointer"
                />
            </div>
        </>
    )
}

export default Gallery
