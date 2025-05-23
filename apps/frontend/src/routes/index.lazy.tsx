import { createLazyFileRoute } from '@tanstack/react-router'
import Project from '@/components/Project'
import { projects } from '@/data/glossary'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <main className="flex scroll-mt-96 flex-col items-center">
            <section className="flex w-[87.5lvw] flex-col items-center gap-2 py-9 text-center md:py-14">
                <header className="text-balance font-serif text-3xl font-semibold md:text-5xl lg:text-6xl">
                    <h1>hey, i'm Devlin 👋</h1>

                    <p className="mt-2 text-xl md:text-2xl lg:text-3xl">
                        i code, design, and game
                    </p>
                </header>

                <p className="max-w-prose text-pretty leading-7">
                    i'm a software engineer based in San Francisco, California
                    with expertise implementing robust and scalable fullstack
                    applications
                </p>
            </section>

            <section
                id="projects"
                className="flex w-full scroll-mt-16 flex-col items-center gap-3"
            >
                {Object.entries(projects).map(
                    ([
                        key,
                        { name, description, src, alt, url, slug, color },
                    ]) => {
                        return (
                            <Project
                                name={name}
                                description={description}
                                src={src}
                                alt={alt}
                                url={url}
                                slug={slug}
                                key={key}
                                className={color}
                            />
                        )
                    }
                )}
            </section>
        </main>
    )
}
