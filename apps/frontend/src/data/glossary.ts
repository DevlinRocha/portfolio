import { chat as banterSrc } from '@/assets/banter'
import { game as vvordleSrc } from '@/assets/vvordle'
import { game as pokemonSrc } from '@/assets/pokemon-roulette'
import { levelSelect as waldoSrc } from '@/assets/wheres-waldo'

export const banter = {
    name: 'Banter' as const,
    description: 'feature-rich fullstack open-source Discord clone' as const,
    src: banterSrc,
    alt: 'Banter: interact with people from across the world. send text messages, images, GIFs, links and more' as const,
    url: 'https://banter.devlinrocha.com' as const,
    slug: '/banter' as const,
    color: 'bg-sky-300' as const,
} as const

export const vvordle = {
    name: 'VVordle' as const,
    description: 'open-source Wordle clone' as const,
    src: vvordleSrc,
    alt: 'VVordle: use clever letter placement to figure out the secret word' as const,
    url: 'https://vvordle.devlinrocha.com' as const,
    slug: '/vvordle' as const,
    color: 'bg-green-500' as const,
} as const

export const pokemonRoulette = {
    name: 'Pokémon Roulette' as const,
    description: 'open-source web version of "who\'s that Pokémon?"' as const,
    src: pokemonSrc,
    alt: 'Pokémon Roulette: choose a difficulty, filter by generation, record your longest streak, and track your fastest correct answer' as const,
    url: 'https://pokemon-roulette.devlinrocha.com' as const,
    slug: '/pokemon-roulette' as const,
    color: 'bg-amber-400' as const,
} as const

export const wheresWaldo = {
    name: "Where's Waldo?" as const,
    description:
        'fullstack open-source web version of the iconic book series' as const,
    src: waldoSrc,
    alt: "Where's Waldo?: six different levels from the iconic book series" as const,
    url: 'https://wheres-waldo.devlinrocha.com' as const,
    slug: '/wheres-waldo' as const,
    color: 'bg-red-600' as const,
} as const

export const projects = {
    banter,
    vvordle,
    pokemonRoulette,
    wheresWaldo,
} as const

export const figma = 'collaborative application for interface design' as const
export const firebase =
    'set of backend cloud computing services and application development platforms, it hosts databases, services, authentication, and integration' as const
export const nextjs =
    'open-source web development framework providing React-based web applications with server-side rendering and static website generation' as const
export const pinia =
    'store library and state management framework for Vue.js, designed primarily for building front-end web applications' as const
export const pokeApi =
    'provides a RESTful API to highly detailed objects built from thousands of lines of data related to Pokémon' as const
export const react =
    'open-source frontend JavaScript library for building user interfaces based on components' as const
export const reactRouter =
    'open-source JavaScript framework that handles client and server-side routing in React applications' as const
export const redux =
    'open-source JavaScript library for managing and centralizing application state' as const
export const reduxToolkit =
    'the official, opinionated toolset for efficient Redux development, intended to be the standard way to write Redux logic' as const
export const styledComponents =
    'open-source package utilizing tagged template literals to style components with CSS, and uses components as a low-level styling construct' as const
export const tailwindCss =
    'open-source CSS framework for building custom user interfaces' as const
export const tenorApi =
    'GIF and sticker library API with a data-centric approach to deliver relevant searches' as const
export const typeScript =
    'open-source programming language that adds static typing with optional type annotations to JavaScript' as const
export const vite =
    'local development server with support for TypeScript and JSX' as const
export const vue =
    'open-source model–view–viewmodel frontend JavaScript framework for building user interfaces and single-page applications' as const

export const tags = [
    '100 Days Of Code',
    'Python',
    'Git',
    'HTML',
    'Beginner',
] as const
