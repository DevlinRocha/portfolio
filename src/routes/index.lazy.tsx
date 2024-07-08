import { createLazyFileRoute } from '@tanstack/react-router'
import Project from '../components/Project'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div
            id="home"
            className="flex scroll-mt-96 flex-col gap-12 px-5 pt-8 lg:gap-32 lg:px-32 lg:pt-24 xl:gap-40 xl:px-64 2xl:px-80"
        >
            <div className="flex flex-col gap-2 xl:gap-8">
                <h1 className="xs:text-5xl text-balance font-serif text-4xl font-semibold leading-snug sm:text-6xl">
                    <span>hey, i&apos;m Devlin 👋</span>

                    <span className="xs:pt-8 xs:leading-none block pt-0.5 leading-tight">
                        i code, design, and game
                    </span>
                </h1>

                <p className="2xs:text-base 2xs:leading-7 mt-4 text-pretty text-sm leading-7 sm:mt-8 xl:mt-0">
                    i'm a software engineer based in San Francisco, California
                    with experience implementing robust and scalable web
                    applications. i'm passionate about improving the lives of
                    others through software and am constantly looking to learn
                    new things
                </p>
            </div>

            <div
                id="projects"
                className="2xs:gap-8 xs:gap-10 flex select-none scroll-mt-16 flex-col gap-4 2xl:gap-16"
            >
                <Project name="Banter" />
                <Project name="VVordle" />
                <Project name="Pokémon Roulette" />
                <Project name="Where's Waldo?" />
            </div>
        </div>
    )
}
