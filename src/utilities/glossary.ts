import { chat as banterSrc } from '@/assets/banter'
import { game as vvordleSrc } from '@/assets/vvordle'
import { game as pokemonSrc } from '@/assets/pokemon-roulette'
import { levelSelect as waldoSrc } from '@/assets/wheres-waldo'

export const projects = {
    banter: {
        name: 'Banter',
        description: 'feature-rich fullstack open-source Discord clone',
        src: banterSrc,
        alt: 'Banter: interact with people from across the world. send text messages, images, GIFs, links and more',
        url: 'https://banter-kappa.vercel.app/',
        slug: '/banter',
        color: 'bg-sky-300',
    },
    vvordle: {
        name: 'VVordle',
        description: 'open-source Wordle clone',
        src: vvordleSrc,
        alt: 'VVordle: use clever letter placement to figure out the secret word',
        url: 'https://vvordle.vercel.app/',
        slug: '/vvordle',
        color: 'bg-green-500',
    },
    pokemonRoulette: {
        name: 'Pokémon Roulette',
        description: 'open-source web version of "who\'s that Pokémon?"',
        src: pokemonSrc,
        alt: 'Pokémon Roulette: choose a difficulty, filter by generation, record your longest streak, and track your fastest correct answer',
        url: 'https://pokemon-roulette.vercel.app/',
        slug: '/pokemon-roulette',
        color: 'bg-amber-400',
    },
    wheresWaldo: {
        name: "Where's Waldo?",
        description:
            'fullstack open-source web version of the iconic book series',
        src: waldoSrc,
        alt: "Where's Waldo?: six different levels from the iconic book series",
        url: 'https://devlinrocha.github.io/wheres-waldo/',
        slug: '/wheres-waldo',
        color: 'bg-red-600',
    },
}

export const glossary = {
    figma: 'collaborative application for interface design',
    firebase:
        'set of backend cloud computing services and application development platforms, it hosts databases, services, authentication, and integration',
    nextjs: 'open-source web development framework providing React-based web applications with server-side rendering and static website generation',
    pinia: 'store library and state management framework for Vue.js, designed primarily for building front-end web applications',
    pokeApi:
        'provides a RESTful API to highly detailed objects built from thousands of lines of data related to Pokémon',
    react: 'open-source frontend JavaScript library for building user interfaces based on components',
    reactRouter:
        'open-source JavaScript framework that handles client and server-side routing in React applications',
    redux: 'open-source JavaScript library for managing and centralizing application state',
    reduxToolkit:
        'the official, opinionated toolset for efficient Redux development, intended to be the standard way to write Redux logic',
    styledComponents:
        'open-source package utilizing tagged template literals to style components with CSS, and uses components as a low-level styling construct',
    tailwindCss:
        'open-source CSS framework for building custom user interfaces',
    tenorApi:
        'GIF and sticker library API with a data-centric approach to deliver relevant searches',
    typeScript:
        'open-source programming language that adds static typing with optional type annotations to JavaScript',
    vite: 'local development server with support for TypeScript and JSX',
    vue: 'open-source model–view–viewmodel frontend JavaScript framework for building user interfaces and single-page applications',
}

export const {
    figma,
    firebase,
    nextjs,
    pinia,
    pokeApi,
    react,
    reactRouter,
    redux,
    reduxToolkit,
    styledComponents,
    tailwindCss,
    tenorApi,
    typeScript,
    vite,
    vue,
} = glossary

export default glossary
