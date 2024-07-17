import { createLazyFileRoute } from '@tanstack/react-router'
import Project from '../components/Project'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <main id="home" className="flex scroll-mt-96 flex-col items-center">
            <section className="flex w-[87.5lvw] max-w-[1152px] flex-col items-center gap-2 py-9 text-center md:py-14">
                <header className="text-balance font-serif text-3xl font-semibold md:text-5xl lg:text-6xl">
                    <h1>hey, i'm Devlin 👋</h1>

                    <p className="mt-2 text-xl md:text-2xl lg:text-3xl">
                        i code, design, and game
                    </p>
                </header>

                <p className="max-w-prose text-pretty leading-7">
                    i'm a software engineer based in San Francisco, California
                    with experience implementing robust and scalable web
                    applications
                </p>
            </section>

            <section
                id="projects"
                className="flex w-full scroll-mt-16 flex-col items-center gap-3"
            >
                <Project
                    name="Banter"
                    description="feature-rich fullstack open-source Discord clone"
                    link="https://banter-kappa.vercel.app/"
                    className="bg-sky-300"
                />
                <Project
                    name="VVordle"
                    description="open-source Wordle clone"
                    link="https://vvordle.vercel.app/"
                    className="bg-green-500"
                />
                <Project
                    name="Pokémon Roulette"
                    description='open-source web version of "who&apos;s that Pokémon?"'
                    link="https://pokemon-roulette.vercel.app/"
                    className="bg-amber-400"
                />
                <Project
                    name="Where's Waldo?"
                    description="fullstack open-source web version of the iconic book series"
                    link="https://devlinrocha.github.io/wheres-waldo/"
                    className="bg-red-600"
                />
            </section>
        </main>
    )
}
