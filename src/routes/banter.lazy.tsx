import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import ProjectsNav from '@/components/ProjectsNav'
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
        alt: 'chat screen with GIF menu open showing available GIFs to send',
        caption: (
            <>
                <b>chat with friends</b> and interact with people from across
                the world. send text messages, images, GIFs, links and more
            </>
        ),
        slug: 'chat-with-friends',
    },
    {
        src: 'banter-user-settings.png',
        alt: 'user profile settings screen where users can customize their avatar and bio',
        caption: (
            <>
                <b>stand out from the crowd with a custom profile.</b> upload
                your own avatar, write a bio, and more
            </>
        ),
        slug: 'custom-profile',
    },
    {
        src: 'banter-login.png',
        alt: 'login screen for logging in to an existing account or using a guest account',
        caption: (
            <>
                <b>login</b> with your email and password or use a guest account
            </>
        ),
        slug: 'login',
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

                    <p className="w-[87.5lvw] max-w-prose">
                        while creating Banter, inspiration struck for an
                        entirely new project based on it. although Banter is
                        feature-rich, it never left early alpha stages. the most
                        notable missing feature is a mobile layout, so if you
                        want to view the deployed project, it's best experienced
                        with a landscape oriented screen
                    </p>

                    <aside className="flex justify-center gap-2.5 py-6 text-sm md:text-base">
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

                    <section className="flex w-full flex-col items-center gap-8 bg-sky-100 py-16">
                        <header className="w-full px-3 xs:px-4 sm:px-5 md:px-[3lvw] lg:px-[5lvw] xl:px-[13lvw] 2xl:px-[19lvw] 3xl:px-[24lvw] 4xl:px-[34lvw]">
                            <h2 className="font-serif text-xl font-semibold md:text-2xl lg:text-3xl">
                                explore features
                            </h2>
                        </header>

                        <Gallery items={galleryItems} />
                    </section>
                </section>
            </article>

            <ProjectsNav filter="banter" />
        </main>
    )
}
