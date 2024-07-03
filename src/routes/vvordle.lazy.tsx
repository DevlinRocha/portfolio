import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/vvordle')({
    component: vvordle,
})

function vvordle() {
    return (
        <div className="flex flex-col gap-4 p-16">
            <h1 className="text-4xl">VVordle</h1>

            <div className="grid grid-cols-2 gap-4">
                <img src="vvordle.png" className="rounded-lg drop-shadow-2xl" />

                <img
                    src="vvordleWin.png"
                    className="rounded-lg drop-shadow-2xl"
                />
            </div>

            <div className="flex flex-col gap-4 p-16">
                <p>
                    VVordle is an open source Wordle clone built with{' '}
                    <b>TypeScript</b>, <b>Vue</b>, and <b>Vite</b>
                </p>

                <p>
                    my goal for VVordle was to teach myself Vue, and i learn
                    best by building projects
                </p>
            </div>

            <img src="vvordleHome.png" className="rounded-lg drop-shadow-2xl" />
        </div>
    )
}
