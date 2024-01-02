import { execSync } from 'child_process'
import { existsSync, readdirSync } from 'fs'
import { resolve, join } from 'path'
import { argv } from 'process'

const folders = ['packages', 'apps']
const args = argv.slice(2)

function getProjects(folder) {
    const dirPath = join(resolve(), folder)
    if (!existsSync(dirPath)) return []

    return readdirSync(dirPath)
        .map((project) => join(dirPath, project))
        .filter((projectPath) => existsSync(join(projectPath, 'package.json')))
}

function buildProject(projectPath) {
    try {
        console.log(`Building ${projectPath}...`)
        execSync('pnpm run build', {
            stdio: 'inherit',
            cwd: projectPath,
        })
        console.log(`✅ Successfully built ${projectPath}`)
    } catch (error) {
        console.error(`❌ Error building ${projectPath}: ${error.message}`)
    }
}

if (args.length === 0) {
    folders.flatMap(getProjects).forEach(buildProject)
} else {
    const allProjects = folders.flatMap(getProjects)

    const projectMap = Object.fromEntries(
        allProjects.map((projectPath) => [
            projectPath.split('/').pop(),
            projectPath,
        ])
    )

    args.forEach((name) => {
        const projectPath = projectMap[name]
        if (projectPath) {
            buildProject(projectPath)
        } else {
            console.error(`Project '${name}' not found.`)
        }
    })
}
