import defaultTheme from 'tailwindcss/defaultTheme'

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
                sans: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    ...defaultTheme.fontFamily.sans,
                ],
                serif: serifFonts,
                display: displayFonts,
                mono: [
                    'Menlo',
                    'Monaco',
                    'Consolas',
                    '"Courier New"',
                    '"Liberation Mono"',
                    'DejaVu Sans Mono',
                    'monospace',
                    ...defaultTheme.fontFamily.mono,
                ],
            },
        },
    },
    plugins: [],
}
