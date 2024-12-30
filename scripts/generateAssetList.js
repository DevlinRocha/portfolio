import fs from 'fs'
import path from 'path'

const distDir = path.resolve('dist')
const manifestPath = path.join(distDir, '.vite/manifest.json')
const outputPath = path.join(distDir, 'asset-list.js')

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
const assetUrls = Object.values(manifest).map((entry) => `/${entry.file}`)
const assetListContent = `const ASSET_LIST = ${JSON.stringify(assetUrls, null, 2)};`

fs.writeFileSync(outputPath, assetListContent)

console.log('Asset list generated:', outputPath)
