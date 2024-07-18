import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import {
    typeScript,
    react,
    nextjs,
    reduxToolkit,
    firebase,
    tailwindCss,
    styledComponents,
    tenorApi,
    figma,
} from '@/utilities/glossary'

export const Route = createLazyFileRoute('/banter')({
    component: banter,
})

const galleryItems = [
    {
        src: 'banter.png',
        title: 'chat with friends',
        description:
            'interact with people from across the world. send text messages, images, GIFs, links and more',
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
                        Banter is a fullstack open-source Discord clone built
                        with <b title={typeScript}>TypeScript</b>,{' '}
                        <b title={react}>React</b>,{' '}
                        <b title={nextjs}>Next.js</b>,{' '}
                        <b title={reduxToolkit}>Redux Toolkit</b>,{' '}
                        <b title={firebase}>Firebase</b>,{' '}
                        <b title={tailwindCss}>Tailwind CSS</b>, and{' '}
                        <b title={styledComponents}>styled-components</b>. the{' '}
                        <b title={tenorApi}>Tenor API</b> is implemented to
                        allow users to share GIFs, and{' '}
                        <b title={figma}>Figma</b> was used to create the logo
                        and icons for the user interface
                    </p>

                    <p>
                        my goal for Banter was to recreate Discord as close as
                        possible (with some exceptions, such as guest accounts)
                    </p>

                    <p>
                        send messages, with text, GIFs, links, and images in a
                        global server, or create your own private server to
                        invite your friends! create an account and customize
                        your profile, or use a guest account without needing to
                        worry about emails and passwords
                    </p>

                    <p>
                        while creating Banter, inspiration struck for an
                        entirely new project based on it. although Banter is
                        feature-rich, it never left early alpha stages. the most
                        notable missing feature is a mobile layout, so if you
                        want to view the deployed project, it's best experienced
                        with a landscape oriented screen
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

                <Gallery
                    items={galleryItems}
                    containerClass="!bg-sky-100"
                    titleClass="text-sky-500"
                />
            </section>
        </main>
    )
}
