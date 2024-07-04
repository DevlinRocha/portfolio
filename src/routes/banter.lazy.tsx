import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/banter')({
    component: banter,
})

function banter() {
    return (
        <div className="flex h-auto w-full flex-col justify-center gap-8 sm:gap-16 lg:gap-24">
            <img
                src="banter-hero.svg"
                className="drop-shadow-lg"
                width={2560}
                height={720}
            />

            <main className="3xl:mx-96 mx-8 flex flex-col gap-8 lg:mx-32 xl:mx-64 2xl:mx-80 2xl:gap-16">
                <div className="flex flex-col text-sm 2xl:gap-1">
                    <h1 className="text-4xl font-semibold md:text-5xl">
                        Banter
                    </h1>
                    <span>
                        {'{ '}
                        <a
                            href="https://github.com/DevlinRocha/banter"
                            target="_blank"
                            rel="noReferrer"
                        >
                            source code
                        </a>
                        {' | '}
                        <a
                            href="https://banter-kappa.vercel.app/"
                            target="_blank"
                            rel="noReferrer"
                        >
                            deployed project
                        </a>
                        {' }'}
                    </span>
                </div>

                <div className="mb-8 flex flex-col gap-2 lg:mb-16 lg:gap-4">
                    <p>
                        Banter is a fullstack open source Discord clone built
                        with <b>TypeScript</b>, <b>React</b>, <b>Next.js</b>,{' '}
                        <b>Redux Toolkit</b>, <b>Firebase</b>,{' '}
                        <b>Tailwind CSS</b>, and <b>styled-components</b>. the{' '}
                        <b>Tenor API</b> is implemented to allow users to share
                        gifs, and <b>Figma</b> was used to create the logo and
                        icons for the user interface
                    </p>

                    <p>
                        my goal for Banter was to resemble Discord as close as
                        possible (with some exceptions, such as guest accounts)
                    </p>
                </div>

                <div className="flex flex-col gap-8 2xl:gap-16">
                    <img
                        src="banter.png"
                        className="rounded-lg drop-shadow-lg"
                        width={1920}
                        height={1080}
                    />

                    <img
                        src="banter-user-settings.png"
                        className="rounded-lg drop-shadow-lg"
                        width={1920}
                        height={1080}
                    />

                    <img
                        src="banter-login.png"
                        className="rounded-lg drop-shadow-lg"
                        width={1920}
                        height={1080}
                    />
                </div>
            </main>
        </div>
    )
}
