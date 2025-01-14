import fs from 'fs/promises'
import path from 'path'
import { argv, cwd, exit } from 'process'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
// import { createPost } from '@portfolio/api'

const components = {
    // MyButton: (props) => <button {...props} />,
}

async function getMdxFiles(directory) {
    const files = []
    const entries = await fs.readdir(directory, { withFileTypes: true })

    for (const entry of entries) {
        const filePath = path.resolve(directory, entry.name)

        if (entry.isDirectory()) {
            files.push(...(await getMdxFiles(filePath)))
        } else if (
            entry.isFile() &&
            path.extname(entry.name).toLowerCase() === '.mdx'
        ) {
            files.push(filePath)
        }
    }

    return files
}

async function mdxToHtml(filePath) {
    try {
        const mdxSource = await fs.readFile(filePath, 'utf8')

        const { default: Content } = await evaluate(mdxSource, {
            ...runtime,
            // remarkPlugins: [],
            // rehypePlugins: [],
            // filepath: filePath,
        })

        const element = React.createElement(
            React.StrictMode,
            null,
            React.createElement(Content, { components })
        )

        return ReactDOMServer.renderToString(element)
    } catch (error) {
        throw new Error(`Error processing ${filePath}: ${error}`)
    }
}

;(async () => {
    const inputPath = argv[2]

    if (!inputPath) {
        console.error('Please provide a directory path containing MDX files.')
        exit(1)
    }

    const absoluteInputPath = path.resolve(cwd(), inputPath)

    try {
        const stats = await fs.stat(absoluteInputPath)

        if (!stats.isDirectory()) {
            console.error('The provided path is not a directory.')
            exit(1)
        }
    } catch (error) {
        console.error(`Error accessing the directory: ${error}`)
        exit(1)
    }

    try {
        const mdxFiles = await getMdxFiles(absoluteInputPath)

        if (mdxFiles.length === 0) {
            console.log('No MDX files found in the provided directory.')
            exit(0)
        }

        console.log(`Found ${mdxFiles.length} MDX file(s). Processing...`)

        for (const file of mdxFiles) {
            try {
                const html = await mdxToHtml(file)
                console.log(`\nRendered HTML for ${file}:\n`)
                console.log(html)

                // TODO: Update database
                // await createPost({ title: 'Title', content: html })
            } catch (error) {
                console.error(error)
            }
        }

        console.log('\nAll MDX files have been processed.')
    } catch (error) {
        console.error(`Error during processing: ${error}`)
        exit(1)
    }
})()
