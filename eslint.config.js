import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import tseslint from 'typescript-eslint'

export default [
    ...pluginQuery.configs['flat/recommended'],
    {
        settings: {
            react: { version: 'detect' },
        },
    },
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { ignores: ['**/dist'] },
    {
        languageOptions: {
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    {
        rules: {
            'react/react-in-jsx-scope': 0,
            'react/no-unescaped-entities': 0,
        },
    },
]
