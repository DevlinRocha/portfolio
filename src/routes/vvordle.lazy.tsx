import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/vvordle')({
    component: vvordle,
})

function vvordle() {
    return (
        <div className="flex h-auto w-full flex-col gap-8 p-8 lg:gap-8 lg:p-16">
            <h1 className="text-4xl">VVordle</h1>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:gap-16">
                <img src="vvordle.png" className="rounded-lg drop-shadow-2xl" />

                <img
                    src="vvordleWin.png"
                    className="hidden rounded-lg drop-shadow-2xl sm:block"
                />
            </div>

            <p>
                VVordle is an open source Wordle clone built with{' '}
                <b>TypeScript</b>, <b>Vue</b>, and <b>Vite</b>
            </p>

            <p>
                my goal for VVordle was to teach myself Vue, and i learn best by
                building projects
            </p>

            <img
                src="vvordleWin.png"
                className="block rounded-lg drop-shadow-2xl sm:hidden"
            />

            <img src="vvordleHome.png" className="rounded-lg drop-shadow-2xl" />
        </div>
    )
}
