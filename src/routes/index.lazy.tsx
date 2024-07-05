import { createLazyFileRoute } from '@tanstack/react-router'
import Project from '../components/Project'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="mx-8 mt-8 flex flex-col gap-16 lg:mx-32 lg:mt-24 lg:gap-32 xl:mx-64 xl:gap-40 2xl:mx-80">
            <div className="flex flex-col gap-2 text-pretty text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:gap-8 xl:text-6xl">
                <h1>hey, i&apos;m Devlin 👋</h1>

                <h1>i code, design, and game</h1>

                <p className="mt-4 text-base xl:mt-0">
                    i'm a software engineer based in San Francisco, California
                    with experience implementing robust and scalable web
                    applications, improving development workflows, and
                    delivering high-quality solutions aligned with business
                    goals. i'm passionate about improving the lives of others
                    through software and am constantly looking to learn new
                    things
                </p>
            </div>

            <div className="flex flex-col gap-8 2xl:gap-16">
                <Project name="Banter" />
                <Project name="VVordle" />
                <Project name="Pokémon Roulette" />
                <Project name="Where's Waldo?" />
            </div>
        </div>
    )
}
