import fs from 'fs'
import path from 'path'

const distDir = path.resolve('dist')
const manifestPath = path.join(distDir, '.vite/manifest.json')
const outputPath = path.join(distDir, 'resource-list.js')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

const routesToCache = [
    '/',
    '/banter',
    '/vvordle',
    '/pokemon-roulette',
    '/wheres-waldo',
    '/about',
    '/blog',
]

const assetPaths = Object.values(manifest).flatMap((entry) => [
    `/${entry.file}`,
    ...(entry.css ? [`/${entry.css}`] : []),
])

const favicons = ['icon.svg', 'icon-512.png', 'icon-192.png', '/favicon.ico']
const resourcesToCache = [...routesToCache, ...assetPaths, ...favicons]
const resourceList = `const RESOURCE_LIST = ${JSON.stringify(resourcesToCache, null, 2)};`
fs.writeFileSync(outputPath, resourceList)

const outputPathOffline = path.resolve('src/assets/offline.html')
const offline = fs.readFileSync(path.join(distDir, 'offline.html'), 'utf-8')
fs.writeFileSync(outputPathOffline, offline)

console.log('Resource list generated:', outputPath)
