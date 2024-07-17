import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'

export const Route = createLazyFileRoute('/banter')({
    component: banter,
})

const galleryItems = [
    {
        src: 'banter.png',
        title: 'chat with friends',
        description:
            'interact with people from across the world. send text messages, images, gifs, links and more',
    },
    {
        src: 'banter-user-settings.png',
        title: 'custom profile',
        description:
            'stand out from the crowd with a custom profile. upload your own avatar, write a bio, and more',
    },
    {
        src: 'banter-login.png',
        title: 'login',
        description:
            'enter your own email and password to create an account or use a guest account',
    },
]

function banter() {
    return (
        <main className="flex flex-col items-center">
            <header className="w-full max-w-[2560px] bg-sky-300 py-14 text-center">
                <h1 className="font-display text-5xl">Banter</h1>
            </header>

            <section className="flex h-full w-full flex-col items-center gap-8 pt-14">
                <div className="flex w-[87.5lvw] max-w-prose flex-col gap-2 text-pretty text-sm leading-7 2xs:text-base 2xs:leading-7">
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

                <div className="flex justify-center gap-2.5 text-sm md:text-base">
                    <a
                        href="https://banter-kappa.vercel.app/"
                        target="_blank"
                        rel="noReferrer"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/banter"
                        target="_blank"
                        rel="noReferrer"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </div>

                <Gallery items={galleryItems} className="text-sky-500" />
            </section>
        </main>
    )
}
