import { existsSync, readdirSync } from 'fs'
import { basename, join, resolve } from 'path'
import { execSync } from 'child_process'
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

if (ignoreErrors) console.warn('⛔️ Ignoring errors...')

function parseFlag(flagName) {
    const flag = flags.find((flag) => flag.startsWith(`${flagName}=`))
    if (!flag) return []
    return flag.replace(`${flagName}=`, '').split(',')
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
    const projectName = basename(projectPath)

    if (!typecheckOnly) {
        try {
            console.log(`Building ${projectName}...`)
            execSync('pnpm build', { stdio: 'inherit', cwd: projectPath })
            console.log(`✅ Successfully built ${projectName}`)
        } catch (error) {
            console.error(`❌ Error building ${projectName}: ${error.message}`)
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

if (!projects.length) {
    const allProjects = directories.flatMap(getProjects)

    console.log(`Building ${allProjects.length} projects...`)

    allProjects.forEach((projectPath, index) => {
        console.log(
            `\n[${index + 1}/${allProjects.length}] Processing ${basename(projectPath)}`
        )
        buildProject(projectPath)
    })

    console.log('\n✅ All projects processed successfully!')
} else {
    const projectPaths = directories.flatMap(getProjects)
    console.log(`Found ${projectPaths.length} total projects`)

    const projectMap = Object.fromEntries(
        projectPaths.map((projectPath) => [basename(projectPath), projectPath])
    )

    console.log(`Building ${projects.length} selected projects...`)
    projects.forEach((name) => {
        const projectPath = projectMap[name]
        if (projectPath) {
            buildProject(projectPath)
        } else {
            console.error(`Project '${name}' not found.`)
            if (!ignoreErrors) exit(1)
        }
    })
    console.log('\nSelected projects processed successfully!')
}
