import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/banter')({
    component: banter,
})

function banter() {
    return (
        <div className="flex flex-col justify-center gap-8 sm:gap-16 lg:gap-24">
            <img
                src="banter-hero.svg"
                alt="Banter hero image"
                width={1920}
                height={720}
                className="drop-shadow-lg"
            />

            <main className="mx-5 flex flex-col gap-12 lg:mx-32 xl:mx-64 2xl:mx-80 2xl:gap-16">
                <div className="flex select-none flex-col text-sm 2xl:gap-1">
                    <h1 className="xs:text-5xl font-display select-text text-4xl font-semibold leading-snug sm:text-6xl">
                        Banter
                    </h1>

                    <span className="text-black/80">
                        {'{ '}
                        <a
                            href="https://github.com/DevlinRocha/banter"
                            target="_blank"
                            rel="noReferrer"
                            className="transition-text hover:text-black"
                        >
                            source code
                        </a>
                        {' | '}
                        <a
                            href="https://banter-kappa.vercel.app/"
                            target="_blank"
                            rel="noReferrer"
                            className="transition-text hover:text-black"
                        >
                            deployed project
                        </a>
                        {' }'}
                    </span>
                </div>

                <div className="2xs:text-base 2xs:leading-7 mb-8 flex flex-col gap-8 text-pretty text-sm leading-7 lg:mb-12">
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

                <div className="2xs:gap-8 xs:gap-10 flex select-none flex-col gap-4 2xl:gap-16">
                    <img
                        src="banter.png"
                        alt="Banter chat screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="banter-user-settings.png"
                        alt="Banter user settings screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />

                    <img
                        src="banter-login.png"
                        alt="Banter login screenshot"
                        width={1920}
                        height={1080}
                        className="rounded-lg drop-shadow-lg"
                    />
                </div>
            </main>
        </div>
    )
}
