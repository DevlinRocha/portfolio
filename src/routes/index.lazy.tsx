import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="flex p-16">
            <div>
                <h1>Devlin Rocha</h1>
                <h2 className="text-xs">Software Engineer</h2>
                <span className="text-5xl">
                    Hey there! 👋 I&apos;m Devlin, a frontend web developer in
                    the San Francisco Bay Area!
                </span>
            </div>
        </div>
    )
}
