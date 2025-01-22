import fs from 'fs/promises'
import path from 'path'
import { argv, cwd, exit } from 'process'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import { createPost, deleteRecords, updatePost } from '@portfolio/api'

const components = {
    h1: () => <></>,
    h2: (props) => (
        <h2
            className="font-serif text-xl font-semibold md:text-2xl lg:text-3xl"
            {...props}
        />
    ),
    h3: (props) => (
        <h3
            className="font-serif text-lg font-semibold md:text-xl lg:text-2xl"
            {...props}
        />
    ),
    p: (props) => <p className="w-[87.5lvw] max-w-prose" {...props} />,
    a: (props) => <a className="text-sky-600 underline" {...props} />,
    img: () => <></>,
    pre: (props) => <pre className="text-wrap" {...props} />,
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

        const {
            default: Content,
            id,
            title,
            images,
            categories,
            tags,
            published,
            created_at,
            action,
        } = await evaluate(mdxSource, {
            ...runtime,
        })

        const element = React.createElement(
            React.StrictMode,
            null,
            React.createElement(Content, { components })
        )

        const html = ReactDOMServer.renderToString(element)

        return {
            html,
            id,
            title,
            images,
            categories,
            tags,
            published,
            created_at,
            action,
        }
    } catch (error) {
        throw new Error(`Error processing ${filePath}: ${error}`)
    }
}

async function main() {
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
            const {
                html,
                id,
                title,
                images,
                categories,
                tags,
                published,
                created_at,
                action,
            } = await mdxToHtml(file)

            console.log(`\nRendered HTML for ${file}:\n`)
            console.log(`${html}\n`)

            switch (action) {
                case 'create':
                    await createPost({
                        id,
                        title,
                        images,
                        categories,
                        tags,
                        published,
                        created_at,
                        content: html,
                    })
                    break
                case 'update':
                    await updatePost({
                        id,
                        data: {
                            title,
                            images,
                            categories,
                            tags,
                            published,
                            created_at,
                            content: html,
                        },
                    })
                    break
                case 'delete':
                    await deleteRecords({ tableKey: 'posts', ids: [id] })
                    break
                case 'skip':
                    console.log(`Skipping ${file}...`)
                    break
                default:
                    console.error(
                        `Invalid action "${action}" in ${file}. Value must be either 'create' or 'update'. Skipping...`
                    )
            }
        }

        console.log('\nAll MDX files have been processed.')
    } catch (error) {
        console.error(`Error during processing: ${error}`)
        exit(1)
    }
}

main()
