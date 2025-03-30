import { useEffect, useState, useRef, useCallback, ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import Caret from './Caret'

interface GalleryProps {
    items: GalleryItem[]
}

interface GalleryItem {
    src: string
    alt: string
    caption: ReactNode
    slug: string
}

export default function Gallery({ items }: GalleryProps) {
    const captionsRef = useRef<(HTMLElement | null)[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [loading, setLoading] = useState(true)

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
            rootMargin: '0px -28% 0px -25%',
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

    function handleLoad() {
        setLoading(false)
    }

    return (
        <>
            <ul className="scrollbar-hide 2xs:px-8 xs:px-10 flex h-auto w-full snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-7 sm:px-12 md:order-2 md:px-[12lvw] xl:px-[calc(50%-490px)]">
                {items.map(
                    ({ src, alt, caption, slug }: GalleryItem, index) => {
                        return (
                            <li
                                id={slug}
                                key={slug}
                                className="shrink-0 snap-center"
                            >
                                <Link
                                    to="."
                                    hash={slug}
                                    hashScrollIntoView
                                    draggable={false}
                                >
                                    <figure className="flex h-full w-min flex-col gap-8">
                                        <img
                                            src={src}
                                            width={1920}
                                            height={1080}
                                            draggable={false}
                                            alt={alt}
                                            onLoad={handleLoad}
                                            className={`max-w-[87.5lvw] rounded-2xl bg-neutral-600 object-contain text-transparent md:max-w-[768px] lg:max-w-[896px] ${loading && src ? 'animate-pulse' : 'animate-none'}`}
                                        />

                                        <figcaption
                                            ref={(item) => {
                                                captionsRef.current[index] =
                                                    item
                                            }}
                                            className="max-w-prose text-pretty text-sm transition-opacity duration-500 ease-out lg:text-base"
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

            <div className="2xs:px-8 xs:px-10 flex w-full justify-end gap-4 px-7 sm:px-12 md:absolute md:mt-0 md:px-[12lvw] xl:px-[calc(50%-490px)]">
                <Caret
                    onClick={(e) => handleClick(e, 'left')}
                    disabled={activeIndex === 0}
                    className="min-h-9 min-w-9"
                />

                <Caret
                    onClick={(e) => handleClick(e, 'right')}
                    disabled={activeIndex === items.length - 1}
                    className="min-h-9 min-w-9 -scale-x-100"
                />
            </div>
        </>
    )
}
