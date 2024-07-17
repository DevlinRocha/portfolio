import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import { typeScript, vue, vite, pinia, pokeApi } from '@/utilities/glossary'

export const Route = createLazyFileRoute('/pokemon-roulette')({
    component: pokemonRoulette,
})

const galleryItems = [
    {
        src: 'pokemon-roulette.png',
        title: "gotta name 'em all",
        description:
            'choose a difficulty, filter by generation, record your longest streak, and track your fastest correct answer',
    },
    {
        src: 'pokemon-roulette-loss.png',
        title: 'learn from your mistakes',
        description: "learn the name of Pokémon you haven't encountered",
    },
    {
        src: 'pokemon-roulette-guess.png',
        title: "who's that Pokémon?",
        description: 'can you name the Pokémon just from a silhouette?',
    },
    {
        src: 'pokemon-roulette-win.png',
        title: 'login',
        description:
            'enter your own email and password to create an account or use a guest account',
    },
]

function pokemonRoulette() {
    return (
        <main className="flex flex-col items-center">
            <header className="w-full max-w-[2560px] bg-amber-400 py-14 text-center">
                <h1 className="font-display text-5xl">Pokémon Roulette</h1>
            </header>

            <section className="flex h-full w-full flex-col items-center gap-8 pt-14">
                <div className="flex w-[87.5lvw] max-w-prose flex-col gap-2 text-pretty text-sm leading-7 2xs:text-base 2xs:leading-7">
                    <p>
                        Pokémon Roulette is an open-source gamified version of
                        "Who's that Pokémon?" from the anime, built with{' '}
                        <b title={typeScript}>TypeScript</b>,{' '}
                        <b title={vue}>Vue</b>, <b title={vite}>Vite</b>,{' '}
                        <b title={pinia}>Pinia</b>, and the{' '}
                        <b title={pokeApi}>PokéApi</b>
                    </p>

                    <p>
                        i created Pokémon Roulette to teach myself Vue using the
                        Options API, the original method of writing components
                        in Vue. at work i was tasked with rewriting a web
                        application from Vue 2 (using the Options API) to Vue 3
                        (using the Composition API), so knowing both API's was
                        important
                    </p>

                    <p>
                        Pokémon Roulette includes features for all sorts of
                        fans! filter Pokémon by generation, choose a difficulty,
                        and keep track of you highest score and fastest correct
                        answer
                    </p>
                </div>

                <div className="flex justify-center gap-2.5 text-sm md:text-base">
                    <a
                        href="https://pokemon-roulette.vercel.app/"
                        target="_blank"
                        rel="noReferrer"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/pokemon-roulette"
                        target="_blank"
                        rel="noReferrer"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </div>

                <Gallery items={galleryItems} className="text-amber-600" />
            </section>
        </main>
    )
}
