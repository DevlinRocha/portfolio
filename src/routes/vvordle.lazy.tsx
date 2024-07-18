import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import { typeScript, vue, vite } from '@/utilities/glossary'

export const Route = createLazyFileRoute('/vvordle')({
    component: vvordle,
})

const galleryItems = [
    {
        src: 'vvordle.png',
        title: 'use hints to win',
        description:
            'use clever letter placement to figure out the secret word',
    },
    {
        src: 'vvordle-home.png',
        title: 'guess the word',
        description: 'can you figure out the 5 letter word in just 6 guesses?',
    },
    {
        src: 'vvordle-game.png',
        title: 'sweet victory',
        description: 'a lucky break is all it takes',
    },
    {
        src: 'vvordle-win.png',
        title: 'new VVordle every day',
        description: 'every day brings a new puzzle to tease your brain',
    },
]

function vvordle() {
    return (
        <main className="flex flex-col items-center">
            <header className="w-full max-w-[2560px] bg-green-500 py-14 text-center">
                <h1 className="font-display text-5xl">VVordle</h1>
            </header>

            <section className="flex h-full w-full flex-col items-center gap-8 pt-14">
                <div className="flex w-[87.5lvw] max-w-prose flex-col gap-2 text-pretty text-sm leading-7 2xs:text-base 2xs:leading-7">
                    <p>
                        VVordle is an open-source Wordle clone built with{' '}
                        <b title={typeScript}>TypeScript</b>,{' '}
                        <b title={vue}>Vue</b>, and <b title={vite}>Vite</b>
                    </p>

                    <p>
                        i created VVordle to teach myself Vue using the
                        Composition API, the new method of writing components in
                        Vue. at work i was tasked with rewriting a web
                        application from Vue 2 (using the Options API) to Vue 3
                        (using the Composition API), so knowing both API's was
                        important
                    </p>

                    <p>
                        VVordle includes most of the features we all love about
                        the original Wordle, and uses the word list from before{' '}
                        <em>The New York Times</em> purchased it
                    </p>
                </div>

                <div className="flex justify-center gap-2.5 text-sm md:text-base">
                    <a
                        href="https://vvordle.vercel.app/"
                        target="_blank"
                        rel="noReferrer"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/vvordle"
                        target="_blank"
                        rel="noReferrer"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </div>

                <Gallery
                    items={galleryItems}
                    containerClass="!bg-green-100"
                    titleClass="text-green-700"
                />
            </section>
        </main>
    )
}
