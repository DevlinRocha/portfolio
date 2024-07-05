import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/vvordle')({
    component: vvordle,
})

function vvordle() {
    return (
        <div className="flex flex-col justify-center gap-8 sm:gap-16 lg:gap-24">
            <img
                src="vvordle-hero.svg"
                className="drop-shadow-lg"
                width={1920}
                height={720}
            />

            <main className="mx-8 flex flex-col gap-8 lg:mx-32 xl:mx-64 2xl:mx-80 2xl:gap-16">
                <div className="flex flex-col text-sm 2xl:gap-1">
                    <h1 className="text-4xl">VVordle</h1>

                    <span>
                        {'{ '}
                        <a
                            href="https://github.com/DevlinRocha/vvordle"
                            target="_blank"
                            rel="noReferrer"
                        >
                            source code
                        </a>
                        {' | '}
                        <a
                            href="https://vvordle.vercel.app"
                            target="_blank"
                            rel="noReferrer"
                        >
                            deployed project
                        </a>
                        {' }'}
                    </span>
                </div>

                <div className="mb-8 flex flex-col gap-2 lg:mb-16 lg:gap-4">
                    <p>
                        VVordle is an open source Wordle clone built with{' '}
                        <b>TypeScript</b>, <b>Vue</b>, and <b>Vite</b>
                    </p>

                    <p>
                        my goal for VVordle was to teach myself Vue, and i learn
                        best by building projects
                    </p>
                </div>

                <div className="flex flex-col gap-8 2xl:gap-16">
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
            </main>
        </div>
    )
}
