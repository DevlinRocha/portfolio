import defaultTheme from 'tailwindcss/defaultTheme'

const sansFonts = [
    'Inter',
    'system-ui',
    'ui-sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Ubuntu',
    'Cantarell',
    'Noto Sans',
    'Oxygen Sans',
    'Arial',
    'sans-serif',
    ...defaultTheme.fontFamily.sans,
] as const

const serifFonts = [
    'Montserrat',
    'ui-serif',
    '-apple-system-ui-serif',
    'Georgia',
    'Times',
    'Times New Roman',
    'DejaVu Serif',
    'serif',
    ...defaultTheme.fontFamily.serif,
] as const

const displayFonts = [
    'Righteous',
    'San Francisco Display',
    ...serifFonts,
] as const

const monoFonts = [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Consolas',
    'Ubuntu Mono',
    'DejaVu Sans Mono',
    'Liberation Mono',
    'monospace',
    ...defaultTheme.fontFamily.mono,
] as const

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        '../../packages/content/blog/**/*.{js,ts,jsx,tsx,mdx}',
        '../../packages/content/scripts/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                '2xs': '448px',
                xs: '528px',
                '3xl': '1840px',
                '4xl': '2208px',
            },
            animation: {
                loading: 'loading 2s linear infinite',
            },
            keyframes: {
                loading: {
                    '0%, 100%': { 'background-color': 'rgb(82, 82, 82, 1)' },
                    '50%': { 'background-color': 'rgb(82, 82, 82, 0.5)' },
                },
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
