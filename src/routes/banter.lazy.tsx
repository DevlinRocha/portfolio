import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/banter')({
    component: banter,
})

function banter() {
    return (
        <div className="flex h-auto w-full flex-col gap-8 p-8 lg:gap-8 lg:p-16">
            <h1 className="text-4xl">Banter</h1>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:gap-16">
                <img
                    src="banter.png"
                    className="rounded-lg drop-shadow-lg"
                    width={1280}
                    height={720}
                />

                <img
                    src="banterLogin.png"
                    className="hidden rounded-lg drop-shadow-lg sm:block"
                    width={1280}
                    height={720}
                />
            </div>

            <p>
                Banter is a fullstack open source Discord clone built with{' '}
                <b>TypeScript</b>, <b>React</b>, <b>Next.js</b>,{' '}
                <b>Redux Toolkit</b>, <b>Firebase</b>, <b>Tailwind CSS</b>, and{' '}
                <b>styled-components</b>. the <b>Tenor API</b> is implemented to
                allow users to share gifs, and <b>Figma</b> was used to create
                the logo and icons for the user interface
            </p>

            <p>
                my goal for Banter was to resemble Discord as close as possible
                (with some exceptions, such as guest accounts)
            </p>

            <img
                src="banterLogin.png"
                className="block rounded-lg drop-shadow-lg sm:hidden"
                width={1280}
                height={720}
            />

            <img
                src="banter.svg"
                className="rounded-lg drop-shadow-lg"
                width={1280}
                height={720}
            />
        </div>
    )
}
