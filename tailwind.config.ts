import defaultTheme from 'tailwindcss/defaultTheme'

const sansFonts = [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    ...defaultTheme.fontFamily.sans,
]

const serifFonts = [
    'Montserrat',
    'Georgia',
    'Times',
    '"Times New Roman"',
    'Cambria',
    'Liberation Serif',
    'DejaVu Serif',
    'serif',
    ...defaultTheme.fontFamily.serif,
]

const displayFonts = [
    'Righteous',
    'San Francisco Display',
    'Segoe UI',
    'Ubuntu',
    ...serifFonts,
]

const monoFonts = [
    'Menlo',
    'Monaco',
    'Consolas',
    '"Courier New"',
    '"Liberation Mono"',
    'DejaVu Sans Mono',
    'monospace',
    ...defaultTheme.fontFamily.mono,
]

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                '2xs': '448px',
                xs: '528px',
            },
            fontFamily: {
                sans: sansFonts,
                serif: serifFonts,
                display: displayFonts,
                mono: monoFonts,
            },
            transitionProperty: {
                height: 'height',
            },
        },
    },
    plugins: [],
}
