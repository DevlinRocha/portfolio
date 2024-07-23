import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import Caret from './Caret'

interface GalleryProps {
    items: GalleryItem[]
}

interface GalleryItem {
    src: string
    alt: string
    caption: JSX.Element
    slug: string
}

function Gallery({ items }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const captionsRef = useRef<(HTMLElement | null)[]>([])

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

    const observerCallback: IntersectionObserverCallback = useCallback(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle(
                    'opacity-0',
                    !entry.isIntersecting
                )

                if (entry.isIntersecting) {
                    setActiveIndex(
                        captionsRef.current.findIndex(
                            (el) => el === entry.target
                        )
                    )
                }
            })
        },
        []
    )

    useEffect(() => {
        const { current: captions } = captionsRef

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5,
            rootMargin: '0px -25%',
        })

        captions.forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => {
            captions.forEach((el) => {
                if (el) observer.unobserve(el)
            })
        }
    }, [observerCallback])

    return (
        <>
            <ul className="scrollbar-hide flex h-auto w-full snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-3 xs:px-4 sm:px-5 md:order-2 md:px-[3lvw] lg:px-[5lvw] xl:px-[13lvw] 2xl:px-[19lvw] 3xl:px-[24lvw] 4xl:px-[34lvw]">
                {items.map(
                    ({ src, alt, caption, slug }: GalleryItem, index) => {
                        return (
                            <li
                                id={slug}
                                key={slug}
                                className="shrink-0 snap-center"
                            >
                                <Link hash={slug} draggable={false}>
                                    <figure className="flex h-full flex-col gap-8">
                                        <img
                                            src={src}
                                            width={1920}
                                            height={1080}
                                            draggable={false}
                                            alt={alt}
                                            className="max-h-[50vh] w-fit max-w-[95lvw] rounded-2xl object-contain text-transparent"
                                        />

                                        <figcaption
                                            ref={(item) =>
                                                (captionsRef.current[index] =
                                                    item)
                                            }
                                            className="w-full max-w-prose text-pretty text-sm transition-opacity duration-500 ease-out lg:text-base"
                                        >
                                            {caption}
                                        </figcaption>
                                    </figure>
                                </Link>
                            </li>
                        )
                    }
                )}
            </ul>

            <div className="flex w-full justify-end gap-4 px-3 xs:px-4 sm:px-5 md:absolute md:order-2 md:mt-0 md:px-[3lvw] lg:px-[5lvw] xl:px-[13lvw] 2xl:px-[19lvw] 3xl:px-[24lvw] 4xl:px-[34lvw]">
                <Caret
                    disabled={activeIndex === 0}
                    onClick={(e) => handleClick(e, 'left')}
                    className="min-h-9 min-w-9"
                />

                <Caret
                    disabled={activeIndex === items.length - 1}
                    onClick={(e) => handleClick(e, 'right')}
                    className="min-h-9 min-w-9 -scale-x-100"
                />
            </div>
        </>
    )
}

export default Gallery
