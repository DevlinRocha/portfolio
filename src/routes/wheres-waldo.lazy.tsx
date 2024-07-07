import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/wheres-waldo')({
    component: wheresWaldo,
})

function wheresWaldo() {
    return (
        <div className="flex flex-col justify-center gap-8 sm:gap-16 lg:gap-24">
            <img
                src="wheres-waldo-hero.svg"
                alt="Where's Waldo? hero image"
                width={1920}
                height={720}
                className="drop-shadow-lg"
            />

            <main className="mx-5 flex flex-col gap-12 lg:mx-32 xl:mx-64 2xl:mx-80 2xl:gap-16">
                <div className="flex select-none flex-col text-sm 2xl:gap-1">
                    <h1 className="xs:text-5xl font-display select-text text-4xl font-semibold leading-snug sm:text-6xl">
                        Where's Waldo?
                    </h1>

                    <span>
                        {'{ '}
                        <a
                            href="https://github.com/DevlinRocha/wheres-waldo"
                            target="_blank"
                            rel="noReferrer"
                        >
                            source code
                        </a>
                        {' | '}
                        <a
                            href="https://devlinrocha.github.io/wheres-waldo/"
                            target="_blank"
                            rel="noReferrer"
                        >
                            deployed project
                        </a>
                        {' }'}
                    </span>
                </div>

                <div className="2xs:text-base 2xs:leading-7 mb-8 flex flex-col gap-8 text-pretty text-sm leading-7 lg:mb-12">
                    <p>
                        Where's Waldo? is a fullstack open source web version of
                        the iconic book series, built with <b>TypeScript</b>,{' '}
                        <b>React</b>, <b>React Router</b>,{' '}
                        <b>styled-components</b>, and <b>Firebase</b>
                    </p>

                    <p>
                        Where's Waldo? was my first time working with a backend,
                        as well as my first time working with TypeScript
                    </p>
                </div>

                <div className="2xs:gap-8 xs:gap-10 flex select-none flex-col gap-4 2xl:gap-16">
                    <img
                        src="wheres-waldo.png"
                        alt="Where's Waldo? home screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="wheres-waldo-guess.png"
                        alt="Where's Waldo? game screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="wheres-waldo-scores.png"
                        alt="Where's Waldo? high scores leaderboard screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="wheres-waldo-bottom.png"
                        alt="Where's Waldo? characters screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />
                </div>
            </main>
        </div>
    )
}
