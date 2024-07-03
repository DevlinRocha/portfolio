import { createLazyFileRoute } from '@tanstack/react-router'
import Project from '../components/Project'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="flex h-auto w-full flex-col gap-4 p-8 lg:gap-8 lg:p-16">
            <div className="flex flex-col text-pretty text-xl sm:text-2xl md:text-4xl">
                <span>hey there! 👋 i&apos;m Devlin, </span>
                <span>a software engineer in the San Francisco Bay Area</span>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:gap-16">
                <Project name="Banter" />
                <Project name="VVordle" />
                <Project name="Pokemon Roulette" />
                <Project name="Where's Waldo?" />
            </div>
        </div>
    )
}
