import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import ProjectList from '@/components/ProjectList'
import {
    typeScript,
    react,
    reactRouter,
    styledComponents,
    firebase,
} from '@/utilities/glossary'

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
            <article className="flex h-full w-full flex-col items-center gap-8 pb-24 md:pb-32 lg:pb-36">
                <header className="w-full max-w-[2560px] bg-red-600 py-14 text-center">
                    <h1 className="font-display text-5xl">Where's Waldo?</h1>
                </header>

                <section className="flex w-full flex-col items-center gap-2 text-pretty pt-6 text-sm leading-7 2xs:text-base 2xs:leading-7 md:pt-12 lg:pt-14">
                    <p className="w-[87.5lvw] max-w-prose">
                        Where's Waldo? is a fullstack open-source web version of
                        the iconic book series, built with{' '}
                        <b title={typeScript}>TypeScript</b>,{' '}
                        <b title={react}>React</b>,{' '}
                        <b title={reactRouter}>React Router</b>,{' '}
                        <b title={styledComponents}>styled-components</b>, and{' '}
                        <b title={firebase}>Firebase</b>
                    </p>

                    <p className="w-[87.5lvw] max-w-prose">
                        my goal for Where's Waldo? was to create my first
                        fullstack application! this was my first time working
                        with a backend, as well as my first time working with
                        TypeScript
                    </p>

                    <p className="w-[87.5lvw] max-w-prose">
                        Where's Waldo? features 6 different levels and 2
                        difficulty modes with separate leaderboards to track the
                        high scores for each
                    </p>
                </section>

                <aside className="flex justify-center gap-2.5 text-sm md:text-base">
                    <a
                        href="https://devlinrocha.github.io/wheres-waldo/"
                        target="_blank"
                        rel="noopener"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/wheres-waldo"
                        target="_blank"
                        rel="noopener"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </aside>

                <Gallery
                    items={galleryItems}
                    containerClass="!bg-red-100"
                    titleClass="text-red-600"
                />
            </article>

            <ProjectList filter="wheresWaldo" className="bg-red-100" />
        </main>
    )
}
