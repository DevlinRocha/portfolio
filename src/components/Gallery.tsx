interface GalleryProps {
    items: GalleryItem[]
}

interface GalleryItem {
    src: string
    title: string
    description: string
}

function Gallery({ items }: GalleryProps) {
    return (
        <ul className="flex h-[480px] w-full snap-x snap-mandatory gap-5 overflow-x-scroll">
            {items.map(({ src, title, description }: GalleryItem, index) => {
                return (
                    <li
                        key={index}
                        className="relative w-full flex-shrink-0 snap-center"
                    >
                        <div className="absolute inset-0">
                            <figure className="flex flex-col items-center gap-10">
                                <div className="flex w-full justify-center rounded-3xl bg-gray-300 py-5">
                                    <img
                                        src={src}
                                        width={1920}
                                        height={1080}
                                        className="w-[87.5lvw]"
                                    />
                                </div>

                                <div className="flex w-[87.5lvw] flex-col items-center gap-7">
                                    <figcaption className="text-lg text-sky-500">
                                        {title}
                                    </figcaption>

                                    <p className="text-xl">{description}</p>
                                </div>
                            </figure>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default Gallery
