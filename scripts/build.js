import { execSync } from 'child_process'
import { existsSync, readdirSync } from 'fs'
import { join, resolve, basename } from 'path'
import { argv, cwd, exit } from 'process'

const directories = ['packages', 'apps']
const args = argv.slice(2)
const flags = args.filter((arg) => arg.startsWith('--'))
const projects = args.filter((arg) => !flags.includes(arg))
const ignoreErrors = flags.includes('--ignore-errors')

const typecheckProjects = parseFlag('--typecheck-projects').map((project) =>
    resolve(join(cwd(), project))
)

const ignoreProjects = parseFlag('--ignore-projects').map((project) =>
    resolve(join(cwd(), project))
)

if (ignoreErrors) console.log('Ignoring errors...')

function parseFlag(flagName) {
    const flag = flags.find((flag) => flag.startsWith(`${flagName}=`))
    return flag ? flag.replace(`${flagName}=`, '').split(',') : []
}

function getProjects(directory) {
    const dirPath = join(resolve(), directory)
    if (!existsSync(dirPath)) return []

    return readdirSync(dirPath)
        .map((project) => join(dirPath, project))
        .filter((projectPath) => existsSync(join(projectPath, 'package.json')))
}

function buildProject(projectPath) {
    if (ignoreProjects.includes(projectPath))
        return console.log(`Skipping ${projectPath} (ignored)`)

    const typecheckOnly = typecheckProjects.includes(projectPath)

    if (!typecheckOnly) {
        try {
            console.log(`Building ${projectPath}...`)
            execSync('pnpm build', { stdio: 'inherit', cwd: projectPath })
            console.log(`✅ Successfully built ${projectPath}`)
        } catch (error) {
            console.error(`❌ Error building ${projectPath}: ${error.message}`)
            if (!ignoreErrors) exit(1)
        }
    } else if (typecheckOnly) {
        try {
            console.log(`Typechecking ${projectPath}...`)
            execSync('pnpm typecheck', {
                stdio: 'inherit',
                cwd: projectPath,
            })
            console.log(`✅ Successfully typechecked ${projectPath}`)
        } catch (error) {
            console.error(
                `❌ Error typechecking ${projectPath}: ${error.message}`
            )
            if (!ignoreErrors) exit(1)
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
            if (!ignoreErrors) exit(1)
        }
    })
}
