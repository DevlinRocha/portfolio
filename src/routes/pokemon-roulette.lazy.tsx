import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/pokemon-roulette')({
    component: pokemonRoulette,
})

function pokemonRoulette() {
    return (
        <div className="flex flex-col gap-4 p-16">
            <h1 className="text-4xl">Pokémon Roulette</h1>

            <div className="grid grid-cols-2 gap-4">
                <img
                    src="pokemon-roulette.png"
                    className="rounded-lg drop-shadow-2xl"
                />

                <img
                    src="pokemon-roulette-guess.png"
                    className="rounded-lg drop-shadow-2xl"
                />
            </div>

            <div className="flex flex-col gap-4 p-16">
                <p>
                    Pokémon Roulette is an open source gamified version of
                    "Who's that Pokémon?" from the anime, built with{' '}
                    <b>TypeScript</b>, <b>Vue</b>, <b>Vite</b>, <b>Pinia</b>,
                    and the <b>PokéApi</b>
                </p>

                <p>
                    my goal for Pokémon Roulette was to teach myself Vue, and i
                    learn best by building projects
                </p>
            </div>

            <img
                src="pokemon-roulette-loss.png"
                className="rounded-lg drop-shadow-2xl"
            />
        </div>
    )
}
