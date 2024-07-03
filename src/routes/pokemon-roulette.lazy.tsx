import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/pokemon-roulette')({
    component: pokemonRoulette,
})

function pokemonRoulette() {
    return (
        <div className="flex h-auto w-full flex-col gap-8 p-8 lg:gap-8 lg:p-16">
            <h1 className="text-4xl">Pokémon Roulette</h1>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:gap-16">
                <img
                    src="pokemon-roulette.png"
                    className="rounded-lg drop-shadow-lg"
                    width={1280}
                    height={720}
                />

                <img
                    src="pokemon-roulette-guess.png"
                    className="hidden rounded-lg drop-shadow-lg sm:block"
                    width={1280}
                    height={720}
                />
            </div>

            <p>
                Pokémon Roulette is an open source gamified version of "Who's
                that Pokémon?" from the anime, built with <b>TypeScript</b>,{' '}
                <b>Vue</b>, <b>Vite</b>, <b>Pinia</b>, and the <b>PokéApi</b>
            </p>

            <p>
                my goal for Pokémon Roulette was to teach myself Vue, and i
                learn best by building projects
            </p>

            <img
                src="pokemon-roulette-guess.png"
                className="block rounded-lg drop-shadow-lg sm:hidden"
                width={1280}
                height={720}
            />

            <img
                src="pokemon-roulette-loss.png"
                className="rounded-lg drop-shadow-lg"
                width={1280}
                height={720}
            />
        </div>
    )
}
