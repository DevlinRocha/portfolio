import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import Caret from './Caret'
import { slug } from '@/utilities/functions'

interface GalleryProps {
    items: GalleryItem[]
    containerClass?: string
    titleClass?: string
    className?: string
}

interface GalleryItem {
    src: string
    alt: string
    title: string
    description: string
}

function Gallery({ items, containerClass, titleClass }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const captionsRef = useRef<(HTMLElement | null)[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const handleClick = useCallback(
        (e: React.MouseEvent | null, direction: 'left' | 'right') => {
            if (e) e.stopPropagation()

            const newIndex =
                direction === 'left' ? activeIndex - 1 : activeIndex + 1

            captionsRef.current[newIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            })
        },
        [activeIndex]
    )

    const updateInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            activeIndex < items.length - 1
                ? handleClick(null, 'right')
                : captionsRef.current[0]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center',
                  })
        }, 5000)
    }, [activeIndex, items.length, handleClick])

    useEffect(() => {
        const { current: captions } = captionsRef
        const { current: interval } = intervalRef

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle(
                        'opacity-0',
                        !entry.isIntersecting
                    )

                    if (entry.isIntersecting) {
                        setActiveIndex(
                            captions.findIndex((el) => el === entry.target)
                        )

                        updateInterval()
                    } else if (
                        !entries.some((el) => el?.isIntersecting) &&
                        interval
                    ) {
                        clearInterval(interval)
                    }
                })
            },
            {
                threshold: 0.5,
                rootMargin: '0px -25%',
            }
        )

        captions.forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => {
            captions.forEach((el) => {
                if (el) observer.unobserve(el)
            })

            if (interval) clearInterval(interval)
        }
    }, [updateInterval])

    return (
        <>
            <ul className="scrollbar-hide flex h-auto w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth md:px-[3lvw] lg:px-[13lvw] xl:px-[19lvw] 2xl:px-[24lvw] 3xl:px-[29lvw] 4xl:px-[36lvw]">
                {items.map(
                    ({ src, alt, title, description }: GalleryItem, index) => {
                        return (
                            <li
                                id={`${slug(title)}`}
                                key={index}
                                className="shrink-0 snap-center"
                            >
                                <Link hash={`${slug(title)}`} draggable={false}>
                                    <figure className="flex h-full flex-col items-center gap-10">
                                        <div
                                            className={`flex h-full flex-col items-center gap-5 rounded-2xl bg-neutral-300 p-5 md:p-12 lg:gap-8 ${containerClass}`}
                                        >
                                            <img
                                                src={src}
                                                width={1920}
                                                height={1080}
                                                draggable={false}
                                                alt={alt}
                                                className="max-h-[50vh] w-fit max-w-[95lvw] object-contain text-transparent"
                                            />

                                            <div
                                                ref={(item) =>
                                                    (captionsRef.current[
                                                        index
                                                    ] = item)
                                                }
                                                className="flex w-[87.5lvw] max-w-[297px] flex-col items-center gap-5 transition-opacity duration-500 ease-out 2xs:max-w-[360px] xs:max-w-[432px] md:max-w-[648px] lg:gap-8"
                                            >
                                                <figcaption
                                                    className={`text-lg font-medium underline underline-offset-8 md:text-xl lg:text-2xl ${titleClass}`}
                                                >
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
                    disabled={activeIndex === 0}
                    onClick={(e) => handleClick(e, 'left')}
                    className="min-h-14 min-w-14"
                />

                <Caret
                    disabled={activeIndex === items.length - 1}
                    onClick={(e) => handleClick(e, 'right')}
                    className="min-h-14 min-w-14 -scale-x-100"
                />
            </div>
        </>
    )
}

export default Gallery
