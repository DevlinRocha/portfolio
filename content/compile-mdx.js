import fs from 'fs'
import path from 'path'
import { evaluate } from '@mdx-js/mdx'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as runtime from 'react/jsx-runtime'
import { argv, cwd, exit } from 'process'

const components = {}

async function mdxToHtml(filePath) {
    const absolutePath = path.resolve(cwd(), filePath)
    const mdxSource = fs.readFileSync(absolutePath, 'utf8')

    const { default: Content } = await evaluate(mdxSource, {
        ...runtime,
    })

    const element = React.createElement(
        React.StrictMode,
        null,
        React.createElement(Content, { components })
    )

    return ReactDOMServer.renderToString(element)
}

;(async () => {
    const filePath = argv[2]
    if (!filePath) {
        console.error('Please provide an MDX file path')
        exit(1)
    }

    try {
        const html = await mdxToHtml(filePath)
        console.log('Rendered HTML:\n', html)
    } catch (error) {
        console.error('Error compiling MDX to HTML:', error)
        exit(1)
    }
})()
