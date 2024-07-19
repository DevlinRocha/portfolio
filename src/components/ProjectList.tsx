import { Link } from '@tanstack/react-router'
import { projects } from '@/utilities/glossary'

interface ProjectProps {
    filter?: string
    className?: string
}

function ProjectList({ filter, className }: ProjectProps) {
    return (
        <section
            className={`flex w-full flex-col items-center gap-9 py-24 md:gap-16 md:py-32 lg:py-36 ${className}`}
        >
            <header className="w-[87.5lvw] max-w-prose">
                <h3 className="font-serif text-3xl font-semibold md:text-5xl">
                    projects
                </h3>
            </header>

            <ul className="flex w-[87.5lvw] max-w-prose flex-col gap-2 md:gap-2.5 lg:gap-3">
                {Object.entries(projects)
                    .filter(([key]) => key !== filter)
                    .map(([key, { name, slug }]) => {
                        return (
                            <li
                                key={key}
                                className="text-xl font-semibold md:text-2xl lg:text-3xl"
                            >
                                <Link to={slug}>{name}</Link>
                            </li>
                        )
                    })}
            </ul>
        </section>
    )
}

export default ProjectList
