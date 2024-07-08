import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/pokemon-roulette')({
    component: pokemonRoulette,
})

function pokemonRoulette() {
    return (
        <div className="flex flex-col justify-center gap-8 sm:gap-16 lg:gap-24">
            <img
                src="pokemon-roulette-hero.svg"
                alt="Pokémon Roulette hero image"
                width={1920}
                height={720}
                className="drop-shadow-lg"
            />

            <main className="mx-5 flex flex-col gap-12 lg:mx-32 xl:mx-64 2xl:mx-80 2xl:gap-16">
                <div className="flex select-none flex-col text-sm 2xl:gap-1">
                    <h1 className="xs:text-5xl font-display select-text text-4xl font-semibold leading-snug sm:text-6xl">
                        Pokémon Roulette
                    </h1>

                    <span className="text-black/80">
                        {'{ '}
                        <a
                            href="https://github.com/DevlinRocha/pokemon-roulette"
                            target="_blank"
                            rel="noReferrer"
                            className="transition-text hover:text-black"
                        >
                            source code
                        </a>
                        {' | '}
                        <a
                            href="https://pokemon-roulette.vercel.app"
                            target="_blank"
                            rel="noReferrer"
                            className="transition-text hover:text-black"
                        >
                            deployed project
                        </a>
                        {' }'}
                    </span>
                </div>

                <div className="2xs:text-base 2xs:leading-7 mb-8 flex flex-col gap-8 text-pretty text-sm leading-7 lg:mb-12">
                    <p>
                        Pokémon Roulette is an open source gamified version of
                        "Who's that Pokémon?" from the anime, built with{' '}
                        <b>TypeScript</b>, <b>Vue</b>, <b>Vite</b>, <b>Pinia</b>
                        , and the <b>PokéApi</b>
                    </p>

                    <p>
                        my goal for Pokémon Roulette was to teach myself Vue,
                        and i learn best by building projects
                    </p>
                </div>

                <div className="2xs:gap-8 xs:gap-10 flex select-none flex-col gap-4 2xl:gap-16">
                    <img
                        src="pokemon-roulette.png"
                        alt="Pokémon Roulette correct answer Lugia screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="pokemon-roulette-loss.png"
                        alt="Pokémon Roulette wrong answer Groudon screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="pokemon-roulette-guess.png"
                        alt="Pokémon Roulette game screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="pokemon-roulette-win.png"
                        alt="Pokémon Roulette correct answer Squirtle screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />
                </div>
            </main>
        </div>
    )
}
