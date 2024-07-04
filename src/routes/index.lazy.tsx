import { createLazyFileRoute } from '@tanstack/react-router'
import Project from '../components/Project'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="3xl:mx-96 mx-8 flex flex-col gap-8 lg:mx-32 xl:mx-64 2xl:mx-80 2xl:gap-16">
            <div className="flex flex-col text-pretty text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                <span>hey there! 👋 i&apos;m Devlin,</span>
                <span>a software engineer in the San Francisco Bay Area</span>
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
