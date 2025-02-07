import pluginQuery from '@tanstack/eslint-plugin-query'
import baseConfig from '../../eslint.config.js'

export default [
    ...baseConfig,
    ...pluginQuery.configs['flat/recommended'],
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
    },
]
