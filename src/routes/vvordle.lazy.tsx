import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import ProjectsNav from '@/components/ProjectsNav'
import { typeScript, vue, vite } from '@/utilities/glossary'

export const Route = createLazyFileRoute('/vvordle')({
    component: vvordle,
})

const galleryItems = [
    {
        src: 'vvordle.png',
        alt: 'game screen with only one letter missing from the correct word',
        title: 'use hints to win',
        description:
            'use clever letter placement to figure out the secret word',
    },
    {
        src: 'vvordle-home.png',
        alt: 'new game screen with a fresh puzzle',
        title: 'guess the word',
        description: 'can you figure out the 5 letter word in just 6 guesses?',
    },
    {
        src: 'vvordle-game.png',
        alt: 'game screen on the verge of being won with a correct guess',
        title: 'sweet victory',
        description: 'a lucky break is all it takes',
    },
    {
        src: 'vvordle-win.png',
        alt: 'victory screen showing the correctly guessed word',
        title: 'new VVordle every day',
        description: 'every day brings a new puzzle to tease your brain',
    },
]

function vvordle() {
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

                <aside className="flex justify-center gap-2.5 text-sm md:text-base">
                    <a
                        href="https://vvordle.vercel.app/"
                        target="_blank"
                        rel="noopener"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/vvordle"
                        target="_blank"
                        rel="noopener"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </aside>

                <Gallery
                    items={galleryItems}
                    containerClass="!bg-green-100"
                    titleClass="text-green-700"
                />
            </article>

            <ProjectsNav filter="vvordle" className="bg-green-100" />
        </main>
    )
}
