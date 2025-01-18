import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import ProjectsNav from '@/components/ProjectsNav'
import { game, newGame, guess, win } from '@/assets/vvordle'
import { typeScript, vue, vite } from '@/data/glossary'

export const Route = createLazyFileRoute('/vvordle')({
    component: Vvordle,
})

const galleryItems = [
    {
        src: game,
        alt: 'game screen with only one letter missing from the correct word',
        caption: (
            <>
                <b>use hints and clever letter placement</b> to figure out the
                secret word. gray letters are not in the secret word, yellow
                letters are in the secret word, but in a different position, and
                green letters are in the secret word and in the correct position
            </>
        ),
        slug: 'use-hints-to-win',
    },
    {
        src: newGame,
        alt: 'new game screen with a fresh puzzle',
        caption: (
            <>
                <b>solve the secret word to win!</b> can you figure out the 5
                letter word in just 6 guesses? think carefully and plan ahead...
                it's more difficult than it sounds. good luck have fun!
            </>
        ),
        slug: 'guess-the-word',
    },
    {
        src: guess,
        alt: 'game screen on the verge of being won with a correct guess',
        caption: (
            <>
                a couple good guesses is all you need for that lucky break to
                achieve <b>sweet, sweet victory</b>!
            </>
        ),
        slug: 'sweet-victory',
    },
    {
        src: win,
        alt: 'victory screen showing the correctly guessed word',
        caption: (
            <>
                there's a <b>new VVordle every day</b>! share your daily results
                in a spoiler free emojified format and come back tomorrow for a
                new puzzle to tease your brain
            </>
        ),
        slug: 'new-VVordle-every-day',
    },
]

function Vvordle() {
    return (
        <main className="flex flex-col items-center">
            <article className="flex h-full w-full flex-col items-center gap-8 pb-24 md:pb-32 lg:pb-36">
                <header className="w-full max-w-[2560px] bg-green-500 py-14 text-center">
                    <h1 className="font-display text-5xl">VVordle</h1>
                </header>

                <section className="flex w-full flex-col items-center gap-2 text-pretty pt-6 text-sm leading-7 2xs:text-base 2xs:leading-7 md:pt-12 lg:pt-14">
                    <p className="w-[87.5lvw] max-w-prose">
                        VVordle is an open-source Wordle clone built with{' '}
                        <b title={typeScript}>TypeScript</b>,{' '}
                        <b title={vue}>Vue</b>, and <b title={vite}>Vite</b>
                    </p>

                    <p className="w-[87.5lvw] max-w-prose">
                        i created VVordle to teach myself Vue using the
                        Composition API, the new method of writing components in
                        Vue. at work i was tasked with rewriting a web
                        application from Vue 2 (using the Options API) to Vue 3
                        (using the Composition API), so knowing both API's was
                        important
                    </p>

                    <p className="w-[87.5lvw] max-w-prose">
                        VVordle includes most of the features we all love about
                        the original Wordle, and uses the word list from before{' '}
                        <em>The New York Times</em> purchased it
                    </p>
                </section>

                <aside className="flex justify-center gap-2.5 py-6 text-sm md:text-base">
                    <a
                        href="https://vvordle.devlinrocha.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/vvordle"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </aside>

                <section className="flex w-full flex-col items-center gap-8 bg-green-100 py-16">
                    <header className="w-full px-7 2xs:px-8 xs:px-10 sm:px-12 md:order-2 md:px-[12lvw] xl:px-[calc(50%-490px)]">
                        <h2 className="font-serif text-xl font-semibold md:text-2xl lg:text-3xl">
                            explore features
                        </h2>
                    </header>

                    <Gallery items={galleryItems} />
                </section>
            </article>

            <ProjectsNav filter="vvordle" />
        </main>
    )
}
