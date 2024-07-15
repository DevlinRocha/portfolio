import { Link } from '@tanstack/react-router'
import Caret from './Caret'

interface GalleryProps {
    items: GalleryItem[]
}

interface GalleryItem {
    src: string
    title: string
    description: string
}

function Gallery({ items }: GalleryProps) {
    function handleClick(e: React.MouseEvent, direction: 'left' | 'right') {
        e.stopPropagation()

        const target = e.currentTarget as HTMLElement
        target?.parentElement?.scrollBy(direction === 'left' ? -16 : 16, 0)
    }

    return (
        <ul className="scrollbar-hide flex h-auto w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-4 md:gap-10 2xl:gap-20">
            <div className="w-0 shrink-0 snap-align-none md:w-[4lvw] lg:w-[10lvw] xl:w-[16lvw] 2xl:w-[20lvw] 3xl:w-[25lvw] 4xl:w-[32lvw]" />
            <Caret
                onClick={(e) => handleClick(e, 'left')}
                className="sticky left-4 top-1/4 min-h-32 min-w-32 cursor-pointer"
            />

            {items.map(({ src, title, description }: GalleryItem, index) => {
                return (
                    <li
                        id={`${index}`}
                        key={index}
                        className="shrink-0 snap-center snap-always"
                    >
                        <Link hash={`${index}`}>
                            <figure className="flex flex-col items-center gap-10">
                                <div className="flex justify-center rounded-2xl bg-gray-300 p-5 md:p-12">
                                    <img
                                        src={src}
                                        width={1920}
                                        height={1080}
                                        draggable={false}
                                        className="max-h-[50vh] w-fit max-w-[95lvw] object-contain"
                                    />
                                </div>

                                <div className="flex w-[87.5lvw] max-w-[297px] flex-col items-center gap-5 2xs:max-w-[360px] xs:max-w-[432px] sm:max-w-[504px] md:max-w-[648px] lg:gap-8">
                                    <figcaption className="text-lg font-medium text-sky-500 underline underline-offset-8 md:text-xl lg:text-2xl">
                                        {title}
                                    </figcaption>

                                    <p className="max-w-prose text-pretty text-lg lg:text-3xl">
                                        {description}
                                    </p>
                                </div>
                            </figure>
                        </Link>
                    </li>
                )
            })}

            <Caret
                onClick={(e) => handleClick(e, 'right')}
                className="sticky right-4 top-1/4 min-h-32 min-w-32 -scale-x-100 cursor-pointer"
            />
            <div className="w-0 shrink-0 snap-align-none md:w-[4lvw] lg:w-[10lvw] xl:w-[16lvw] 2xl:w-[20lvw] 3xl:w-[25lvw] 4xl:w-[32lvw]" />
        </ul>
    )
}

export default Gallery
