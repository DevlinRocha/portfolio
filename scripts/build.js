import { execSync } from 'child_process'
import { existsSync, readdirSync } from 'fs'
import { join, resolve, basename } from 'path'
import { argv, cwd, exit } from 'process'

const directories = ['packages', 'apps']
const args = argv.slice(2)
const flags = args.filter((arg) => arg.startsWith('--'))
const projects = args.filter((arg) => !flags.includes(arg))
const ignoreErrors = flags.includes('--ignore-errors')

if (ignoreErrors) console.log('Ignoring errors...')

const excludedProjects = ['packages/api'].map((project) =>
    resolve(join(cwd(), project))
)

function getProjects(directory) {
    const dirPath = join(resolve(), directory)
    if (!existsSync(dirPath)) return []

    return readdirSync(dirPath)
        .map((project) => join(dirPath, project))
        .filter(
            (projectPath) =>
                existsSync(join(projectPath, 'package.json')) &&
                !excludedProjects.includes(projectPath)
        )
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
        if (!ignoreErrors) {
            exit(1)
        }
    }
}

if (projects.length === 0) {
    directories.flatMap(getProjects).forEach(buildProject)
} else {
    const projectPaths = directories.flatMap(getProjects)

    const projectMap = Object.fromEntries(
        projectPaths.map((projectPath) => [basename(projectPath), projectPath])
    )

    projects.forEach((name) => {
        const projectPath = projectMap[name]
        if (projectPath) {
            buildProject(projectPath)
        } else {
            console.error(`Project '${name}' not found.`)
            if (!ignoreErrors) {
                exit(1)
            }
        }
    })
}
