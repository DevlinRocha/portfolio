import Carousel from './Carousel'

interface GalleryProps {
    heading: string
    galleryItems: GalleryItem[]
}

interface GalleryItem {
    src: string
    alt: string
    caption: JSX.Element
    slug: string
}

function Gallery({ heading, galleryItems }: GalleryProps) {
    return (
        <section className="flex w-full flex-col items-center gap-8 bg-sky-100 py-16">
            <header className="w-full px-7 2xs:px-8 xs:px-10 sm:px-12 md:order-2 md:px-[12lvw] xl:px-[calc(50%-490px)]">
                <h2 className="font-serif text-xl font-semibold md:text-2xl lg:text-3xl">
                    {heading}
                </h2>
            </header>

            <Carousel items={galleryItems} />
        </section>
    )
}

export default Gallery
