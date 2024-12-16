import { Link } from '@tanstack/react-router'
import * as projects from '@/utilities/glossary/projects'

interface ProjectProps {
    filter?: string
}

export default function ProjectsNav({ filter }: ProjectProps) {
    return (
        <section className="flex w-full flex-col items-center gap-9 py-24 md:gap-16 md:py-32 lg:py-36">
            <header className="w-[87.5lvw] max-w-prose">
                <h3 className="font-serif text-3xl font-semibold md:text-5xl">
                    projects
                </h3>
            </header>

            <nav className="w-[87.5lvw] max-w-prose">
                <ul className="flex flex-col gap-2 md:gap-2.5 lg:gap-3">
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
            </nav>
        </section>
    )
}
