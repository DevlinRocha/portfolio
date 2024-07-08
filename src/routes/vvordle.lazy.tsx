import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/vvordle')({
    component: vvordle,
})

function vvordle() {
    return (
        <div className="flex flex-col justify-center gap-8 sm:gap-16 lg:gap-24">
            <img
                src="vvordle-hero.svg"
                alt="VVordle hero image"
                width={1920}
                height={720}
                className="drop-shadow-lg"
            />

            <main className="flex flex-col gap-12 px-5 lg:px-32 xl:px-64 2xl:gap-16 2xl:px-80">
                <div className="flex select-none flex-col text-sm 2xl:gap-1">
                    <h1 className="xs:text-5xl font-display select-text text-4xl font-semibold leading-snug sm:text-6xl">
                        VVordle
                    </h1>

                    <span className="text-black/80">
                        {'{ '}
                        <a
                            href="https://github.com/DevlinRocha/vvordle"
                            target="_blank"
                            rel="noReferrer"
                            className="transition-text hover:text-black hover:underline"
                        >
                            source code
                        </a>
                        {' | '}
                        <a
                            href="https://vvordle.vercel.app"
                            target="_blank"
                            rel="noReferrer"
                            className="transition-text hover:text-black hover:underline"
                        >
                            deployed project
                        </a>
                        {' }'}
                    </span>
                </div>

                <div className="2xs:text-base 2xs:leading-7 mb-8 flex flex-col gap-8 text-pretty text-sm leading-7 lg:mb-12">
                    <p>
                        VVordle is an open source Wordle clone built with{' '}
                        <b>TypeScript</b>, <b>Vue</b>, and <b>Vite</b>
                    </p>

                    <p>
                        my goal for VVordle was to teach myself Vue, and i learn
                        best by building projects
                    </p>
                </div>

                <div className="2xs:gap-8 xs:gap-10 flex select-none flex-col gap-4 2xl:gap-16">
                    <img
                        src="vvordle.png"
                        alt="VVordle playing game screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="vvordle-home.png"
                        alt="VVordle new game screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="vvordle-game.png"
                        alt="VVordle guessing screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="vvordle-win.png"
                        alt="VVordle game victory screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />
                </div>
            </main>
        </div>
    )
}
