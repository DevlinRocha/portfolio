import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import ProjectsNav from '@/components/ProjectsNav'
import { game, loss, guess, win } from '@/assets/pokemon-roulette'
import { typeScript, vue, vite, pinia, pokeApi } from '@/utilities/glossary'

export const Route = createLazyFileRoute('/pokemon-roulette')({
    component: pokemonRoulette,
})

const galleryItems = [
    {
        src: game,
        alt: 'victory screen with new record fastest time',
        caption: (
            <>
                <b>gotta name 'em all!</b> select any combination of Pokémon
                generations to filter by. guess from only the silhouette on
                normal difficulty or view the full color sprite on easy
                difficulty. record your current score, longest streak, previous
                correct answer time, and fastest correct answer
            </>
        ),
        slug: "gotta-name-'em-all",
    },
    {
        src: loss,
        alt: 'failure screen from an incorrect guess',
        caption: (
            <>
                incorrect answers are great <b>opportunities to learn</b>! if
                you don't know the name of a Pokémon, it will be revealed for
                you to discover. time to start a new game and build that score
                back up!
            </>
        ),
        slug: 'learn-the-names-of-pokemon',
    },
    {
        src: guess,
        alt: 'game screen displaying a Pokémon silhouette to guess',
        caption: (
            <>
                <b>who's that Pokémon?</b> can you name the Pokémon from only
                their silhouette? full color sprites can also be used on easy
                difficulty
            </>
        ),
        slug: 'whos-that-Pokémon?',
    },
    {
        src: win,
        alt: 'victory screen showing previously guessed Pokémon',
        caption: (
            <>
                <b>it's Squirtle!</b> there's over 1,000 more Pokémon, can you
                name them all? correct answers are automatically detected and
                times are recorded
            </>
        ),
        slug: 'its-squirtle',
    },
]

function pokemonRoulette() {
    return (
        <main className="flex flex-col items-center">
            <article className="flex h-full w-full flex-col items-center gap-8 pb-24 md:pb-32 lg:pb-36">
                <header className="w-full max-w-[2560px] bg-amber-400 py-14 text-center">
                    <h1 className="font-display text-5xl">Pokémon Roulette</h1>
                </header>

                <section className="flex w-full flex-col items-center gap-2 text-pretty pt-6 text-sm leading-7 2xs:text-base 2xs:leading-7 md:pt-12 lg:pt-14">
                    <p className="w-[87.5lvw] max-w-prose">
                        Pokémon Roulette is an open-source gamified version of
                        "Who's that Pokémon?" from the anime, built with{' '}
                        <b title={typeScript}>TypeScript</b>,{' '}
                        <b title={vue}>Vue</b>, <b title={vite}>Vite</b>,{' '}
                        <b title={pinia}>Pinia</b>, and the{' '}
                        <b title={pokeApi}>PokéApi</b>
                    </p>

                    <p className="w-[87.5lvw] max-w-prose">
                        i created Pokémon Roulette to teach myself Vue using the
                        Options API, the original method of writing components
                        in Vue. at work i was tasked with rewriting a web
                        application from Vue 2 (using the Options API) to Vue 3
                        (using the Composition API), so knowing both API's was
                        important
                    </p>

                    <p className="w-[87.5lvw] max-w-prose">
                        Pokémon Roulette includes features for all sorts of
                        fans! filter Pokémon by generation, choose a difficulty,
                        and keep track of you highest score and fastest correct
                        answer
                    </p>
                </section>

                <aside className="flex justify-center gap-2.5 py-6 text-sm md:text-base">
                    <a
                        href="https://pokemon-roulette.vercel.app/"
                        target="_blank"
                        rel="noopener"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/pokemon-roulette"
                        target="_blank"
                        rel="noopener"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </aside>

                <section className="flex w-full flex-col items-center gap-8 bg-amber-100 py-16">
                    <header className="w-full px-7 2xs:px-8 xs:px-10 sm:px-12 md:order-2 md:px-[12lvw] xl:px-[calc(50%-490px)]">
                        <h2 className="font-serif text-xl font-semibold md:text-2xl lg:text-3xl">
                            explore features
                        </h2>
                    </header>

                    <Gallery items={galleryItems} />
                </section>
            </article>

            <ProjectsNav filter="pokemonRoulette" />
        </main>
    )
}
