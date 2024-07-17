import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'

export const Route = createLazyFileRoute('/wheres-waldo')({
    component: wheresWaldo,
})

const galleryItems = [
    {
        src: 'wheres-waldo.png',
        title: 'choose a level',
        description: '6 different levels from the iconic book series',
    },
    {
        src: 'wheres-waldo-guess.png',
        title: 'find Waldo',
        description: 'select anywhere in the picture to make a guess',
    },
    {
        src: 'wheres-waldo-scores.png',
        title: 'high scores',
        description: 'find Waldo quick enough to make it on the leaderboard',
    },
    {
        src: 'wheres-waldo-bottom.png',
        title: 'more than just Waldo',
        description: 'can you find all the different characters?',
    },
]

function wheresWaldo() {
    return (
        <main className="flex flex-col items-center">
            <header className="w-full max-w-[2560px] bg-red-600 py-14 text-center">
                <h1 className="font-display text-5xl">Where's Waldo?</h1>
            </header>

            <section className="flex h-full w-full flex-col items-center gap-8 pt-14">
                <div className="flex w-[87.5lvw] max-w-prose flex-col gap-2 text-pretty text-sm leading-7 2xs:text-base 2xs:leading-7">
                    <p>
                        Where's Waldo? is a fullstack open-source web version of
                        the iconic book series, built with <b>TypeScript</b>,{' '}
                        <b>React</b>, <b>React Router</b>,{' '}
                        <b>styled-components</b>, and <b>Firebase</b>
                    </p>

                    <p>
                        my goal for Where's Waldo? was to create my first
                        fullstack application! this was my first time working
                        with a backend, as well as my first time working with
                        TypeScript
                    </p>

                    <p>
                        Where's Waldo? features 6 different levels and 2
                        difficulty modes with separate leaderboards to track the
                        high scores for each
                    </p>
                </div>

                <div className="flex justify-center gap-2.5 text-sm md:text-base">
                    <a
                        href="https://devlinrocha.github.io/wheres-waldo/"
                        target="_blank"
                        rel="noReferrer"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/wheres-waldo"
                        target="_blank"
                        rel="noReferrer"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </div>

                <Gallery items={galleryItems} className="text-red-600" />
            </section>
        </main>
    )
}
