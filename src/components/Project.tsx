import { Link } from '@tanstack/react-router'

interface ProjectProps {
    name?: string
    description?: string
    link?: string
    slug?: string
    alt?: string
    className?: string
}

function Project({
    name,
    description,
    link,
    slug,
    alt,
    className,
}: ProjectProps) {
    return (
        <Link
            to={slug}
            draggable={false}
            className={`flex max-h-[500px] w-full max-w-[2560px] select-none items-center justify-center md:max-h-[650px] lg:max-h-[692px] ${className}`}
        >
            <figure className="w-[87.5lvw] py-8 text-center">
                <div className="flex flex-col items-center gap-4">
                    <figcaption>
                        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl">
                            {name}
                        </h2>
                        <p className="mt-1 max-w-prose text-balance text-xl md:text-2xl lg:text-3xl">
                            {description}
                        </p>
                    </figcaption>

                    <div className="flex gap-2.5 text-sm md:text-base">
                        <Link
                            to={slug}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                        >
                            learn more
                        </Link>

                        {link && (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                            >
                                view project
                            </a>
                        )}
                    </div>

                    <div className="max-w-[480px] md:max-w-[672px] lg:max-w-[720px]">
                        <img
                            src={slug && `${slug}.png`}
                            width={1280}
                            height={720}
                            draggable={false}
                            alt={alt}
                            className="rounded-lg bg-neutral-600 object-contain text-transparent drop-shadow-lg"
                        />
                    </div>
                </div>
            </figure>
        </Link>
    )
}

export default Project
