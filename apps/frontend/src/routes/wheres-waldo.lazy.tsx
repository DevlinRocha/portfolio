import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import ProjectsNav from '@/components/ProjectsNav'
import { levelSelect, game, scores, characters } from '@/assets/wheres-waldo'
import {
    typeScript,
    react,
    reactRouter,
    styledComponents,
    firebase,
} from '@/data/glossary'

export const Route = createLazyFileRoute('/wheres-waldo')({
    component: WheresWaldo,
})

const galleryItems = [
    {
        src: levelSelect,
        alt: 'level selection screen with six different levels from the book series',
        caption: (
            <>
                choose from <b>six different levels</b> from the iconic book
                series and two different difficulties with separate
                leaderboards. "Waldo Mode" where you only find Waldo, or
                "Challenge Mode" where you find all five different characters
            </>
        ),
        slug: 'choose-a-level',
    },
    {
        src: game,
        alt: 'game screen displaying the "Beach" level',
        caption: (
            <>
                <b>where's Waldo?</b> select anywhere in the picture and choose
                a character from the dropdown menu to make a guess. results of
                the guess will be displayed, and a correct guess will cross the
                characters name off the list
            </>
        ),
        slug: 'find-Waldo',
    },
    {
        src: scores,
        alt: 'high scores screen for the "Gobbling Gluttons" level',
        caption: (
            <>
                <b>become a legend.</b> find Waldo quick enough to make it on
                the high scores leaderboard. each level and difficulty
                combination has a separate leaderboard
            </>
        ),
        slug: 'high-scores',
    },
    {
        src: characters,
        alt: 'screen showing the five different characters to find in each level',
        caption: (
            <>
                there's <b>more than just Waldo</b>, can you find all the
                different characters? play "Challenge Mode" to look for all
                five!
            </>
        ),
        slug: 'more-than-just-Waldo',
    },
]

function WheresWaldo() {
    return (
        <main className="flex flex-col items-center">
            <article className="flex h-full w-full flex-col items-center gap-8 pb-24 md:pb-32 lg:pb-36">
                <header className="w-full max-w-[2560px] bg-red-600 py-14 text-center">
                    <h1 className="font-display text-5xl">Where's Waldo?</h1>
                </header>

                <section className="2xs:text-base 2xs:leading-7 flex w-full flex-col items-center gap-2 text-pretty pt-6 text-sm leading-7 md:pt-12 lg:pt-14">
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

                <aside className="flex justify-center gap-2.5 py-6 text-sm md:text-base">
                    <a
                        href="https://wheres-waldo.devlinrocha.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/wheres-waldo"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </aside>

                <section className="flex w-full flex-col items-center gap-8 bg-red-100 py-16">
                    <header className="2xs:px-8 xs:px-10 w-full px-7 sm:px-12 md:order-2 md:px-[12lvw] xl:px-[calc(50%-490px)]">
                        <h2 className="font-serif text-xl font-semibold md:text-2xl lg:text-3xl">
                            explore features
                        </h2>
                    </header>

                    <Gallery items={galleryItems} />
                </section>
            </article>

            <ProjectsNav filter="wheresWaldo" />
        </main>
    )
}
