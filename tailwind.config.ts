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
] as const

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
] as const

const displayFonts = [
    'Righteous',
    'San Francisco Display',
    'Segoe UI',
    'Ubuntu',
    ...serifFonts,
] as const

const monoFonts = [
    'Menlo',
    'Monaco',
    'Consolas',
    '"Courier New"',
    '"Liberation Mono"',
    'DejaVu Sans Mono',
    'monospace',
    ...defaultTheme.fontFamily.mono,
] as const

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                '2xs': '448px',
                xs: '528px',
                '3xl': '1840px',
                '4xl': '2208px',
            },
            fontFamily: {
                sans: sansFonts,
                serif: serifFonts,
                display: displayFonts,
                mono: monoFonts,
            },
            transitionProperty: {
                'layout-transform': 'margin, padding, transform',
                layout: 'height, max-height, border, margin, padding',
                height: 'height, max-height, border',
                text: 'color, opacity',
            },
            scale: {
                101: '1.01',
            },
        },
    },
    plugins: [],
} as const
