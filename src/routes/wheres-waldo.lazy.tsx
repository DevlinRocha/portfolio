import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/wheres-waldo')({
    component: wheresWaldo,
})

function wheresWaldo() {
    return (
        <div className="flex h-auto w-full flex-col justify-center gap-8 sm:gap-16 lg:gap-24">
            <img
                src="wheres-waldo-hero.svg"
                className="drop-shadow-lg"
                width={2560}
                height={720}
            />

            <main className="3xl:mx-96 mx-8 flex flex-col gap-8 lg:mx-32 xl:mx-64 2xl:mx-80 2xl:gap-16">
                <div className="flex flex-col text-sm 2xl:gap-1">
                    <h1 className="text-4xl">Where's Waldo?</h1>

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

                <div className="mb-8 flex flex-col gap-2 lg:mb-16 lg:gap-4">
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

                <div className="flex flex-col gap-8 2xl:gap-16">
                    <img
                        src="wheres-waldo.png"
                        className="rounded-lg drop-shadow-lg"
                        width={1920}
                        height={1080}
                    />

                    <img
                        src="wheres-waldo-guess.png"
                        className="rounded-lg drop-shadow-lg"
                        width={1920}
                        height={1080}
                    />

                    <img
                        src="wheres-waldo-scores.png"
                        className="rounded-lg drop-shadow-lg"
                        width={1920}
                        height={1080}
                    />

                    <img
                        src="wheres-waldo-bottom.png"
                        className="rounded-lg drop-shadow-lg"
                        width={1920}
                        height={1080}
                    />
                </div>
            </main>
        </div>
    )
}
