import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/vvordle')({
    component: vvordle,
})

function vvordle() {
    return (
        <div className="flex h-auto w-full flex-col gap-8 p-8 lg:gap-8 lg:p-16">
            <h1 className="text-4xl">VVordle</h1>

            <div className="flex flex-col gap-4">
                <p>
                    VVordle is an open source Wordle clone built with{' '}
                    <b>TypeScript</b>, <b>Vue</b>, and <b>Vite</b>
                </p>

                <p>
                    my goal for VVordle was to teach myself Vue, and i learn
                    best by building projects
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 2xl:grid-cols-2 2xl:gap-16">
                <img
                    src="vvordle.png"
                    className="rounded-lg drop-shadow-lg"
                    width={1920}
                    height={1080}
                />

                <img
                    src="vvordle-home.png"
                    className="rounded-lg drop-shadow-lg"
                    width={1920}
                    height={1080}
                />
            </div>

            <div className="grid grid-cols-2 gap-8 2xl:gap-16">
                <img
                    src="vvordle-game.png"
                    className="rounded-lg drop-shadow-lg"
                    width={1920}
                    height={1080}
                />

                <img
                    src="vvordle-win.png"
                    className="rounded-lg drop-shadow-lg"
                    width={1920}
                    height={1080}
                />
            </div>
        </div>
    )
}
