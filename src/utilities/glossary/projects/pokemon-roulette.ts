import { game as pokemonSrc } from '@/assets/pokemon-roulette'

export const pokemonRoulette = {
    name: 'Pokémon Roulette',
    description: 'open-source web version of "who\'s that Pokémon?"',
    src: pokemonSrc,
    alt: 'Pokémon Roulette: choose a difficulty, filter by generation, record your longest streak, and track your fastest correct answer',
    url: 'https://pokemon-roulette.devlinrocha.com',
    slug: '/pokemon-roulette',
    color: 'bg-amber-400',
} as const
