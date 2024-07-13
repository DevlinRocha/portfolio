import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'

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
            <div className="w-full max-w-[2560px] bg-green-500 py-14 text-center">
                <h1 className="font-display text-5xl">VVordle</h1>
            </div>

            <div className="flex h-full w-full flex-col items-center gap-8 pt-14">
                <div className="flex w-[87.5lvw] max-w-prose flex-col gap-2 text-pretty text-sm leading-7 2xs:text-base 2xs:leading-7">
                    <p>
                        VVordle is an open source Wordle clone built with{' '}
                        <b>TypeScript</b>, <b>Vue</b>, and <b>Vite</b>
                    </p>

                    <p>
                        my goal for VVordle was to teach myself Vue, and i learn
                        best by building projects
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

                <Gallery items={galleryItems} />
            </div>
        </main>
    )
}
