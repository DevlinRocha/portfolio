import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/banter')({
    component: banter,
})

function banter() {
    return (
        <div className="flex flex-col gap-4 p-16">
            <h1 className="text-4xl">Banter</h1>

            <div className="grid grid-cols-2 gap-4">
                <img src="banter.png" className="rounded-lg drop-shadow-2xl" />

                <img
                    src="banterLogin.png"
                    className="rounded-lg drop-shadow-2xl"
                />
            </div>

            <div className="flex flex-col gap-4 p-16">
                <p>
                    Banter is a fullstack open source Discord clone built with{' '}
                    <b>TypeScript</b>, <b>React</b>, <b>Next.js</b>,{' '}
                    <b>Redux Toolkit</b>, <b>Firebase</b>, <b>Tailwind CSS</b>,
                    and <b>styled-components</b>. the <b>Tenor API</b> is
                    implemented to allow users to share gifs, and
                    <b>Figma</b> was used to create the logo and icons for the
                    user interface
                </p>

                <p>
                    my goal for Banter was to resemble Discord as close as
                    possible (with some exceptions, such as guest accounts)
                </p>
            </div>

            <img src="banter.svg" />
        </div>
    )
}
