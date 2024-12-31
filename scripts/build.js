import { execSync } from 'child_process'
import { existsSync, readdirSync } from 'fs'
import { resolve, join } from 'path'

const folders = ['packages', 'apps']

folders.forEach((folder) => {
    const dirPath = join(resolve(), folder)
    if (existsSync(dirPath)) {
        const projects = readdirSync(dirPath)
        projects.forEach((project) => {
            const projectPath = join(dirPath, project)
            if (existsSync(join(projectPath, 'package.json'))) {
                console.log(`Building ${project}...`)
                try {
                    execSync('pnpm run build', {
                        stdio: 'inherit',
                        cwd: projectPath,
                    })
                } catch (error) {
                    console.error(`Error building ${project}: ${error}`)
                    throw new Error(`Error building ${project}: ${error}`)
                }
            }
        })
    }
})
