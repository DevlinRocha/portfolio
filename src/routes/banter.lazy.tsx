import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import ProjectList from '@/components/ProjectList'
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
            <article className="flex h-full w-full flex-col items-center gap-8 pb-24 md:pb-32 lg:pb-36">
                <header className="w-full max-w-[2560px] bg-sky-300 py-14 text-center">
                    <h1 className="font-display text-5xl">Banter</h1>
                </header>

                <section className="flex w-full flex-col items-center gap-2 text-pretty pt-6 text-sm leading-7 2xs:text-base 2xs:leading-7 md:pt-12 lg:pt-14">
                    <p className="w-[87.5lvw] max-w-prose">
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

                    <p className="w-[87.5lvw] max-w-prose">
                        my goal for Banter was to recreate Discord as close as
                        possible (with some exceptions, such as guest accounts)
                    </p>

                    <section className="my-5 flex w-full max-w-[1024px] flex-col items-center gap-14 bg-sky-100 pb-11 pt-16 md:gap-9 md:pb-16 lg:gap-20 lg:pt-24">
                        <header className="w-[87.5lvw] max-w-prose">
                            <h2 className="font-serif text-4xl font-semibold md:text-5xl lg:text-6xl">
                                features
                            </h2>
                        </header>

                        <ul className="flex w-[87.5lvw] max-w-prose flex-col gap-3">
                            <li>
                                send messages, with text, GIFs, links, and
                                images
                            </li>
                            <li>
                                chat in a global server, or create your own
                                private server to invite your friends!
                            </li>
                            <li>
                                create an account and customize your profile, or
                                use a guest account without needing to worry
                                about emails and passwords
                            </li>
                        </ul>
                    </section>

                    <p className="w-[87.5lvw] max-w-prose">
                        while creating Banter, inspiration struck for an
                        entirely new project based on it. although Banter is
                        feature-rich, it never left early alpha stages. the most
                        notable missing feature is a mobile layout, so if you
                        want to view the deployed project, it's best experienced
                        with a landscape oriented screen
                    </p>
                </section>

                <aside className="flex justify-center gap-2.5 text-sm md:text-base">
                    <a
                        href="https://banter-kappa.vercel.app/"
                        target="_blank"
                        rel="noopener"
                        className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                    >
                        view project
                    </a>

                    <a
                        href="https://github.com/DevlinRocha/banter"
                        target="_blank"
                        rel="noopener"
                        className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                    >
                        source code
                    </a>
                </aside>

                <Gallery
                    items={galleryItems}
                    containerClass="!bg-sky-100"
                    titleClass="text-sky-500"
                />
            </article>

            <ProjectList filter="banter" className="bg-sky-100" />
        </main>
    )
}
