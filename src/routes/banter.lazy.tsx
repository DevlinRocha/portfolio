import { createLazyFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/Gallery'
import ProjectsNav from '@/components/ProjectsNav'
import { chat, userSettings, login } from '@/assets/banter'
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
} from '@/utilities/glossary/terms'

export const Route = createLazyFileRoute('/banter')({
    component: banter,
})

const galleryItems = [
    {
        src: chat,
        alt: 'chat screen with GIF menu open showing available GIFs to send',
        caption: (
            <>
                <b>send messages with images, GIFs, links</b>, and more. chat in
                a global server and interact with people from across the world,
                or create a private server to invite your friends. create text
                channels to organize the discussions on your server, and create
                custom roles to organize the members of your server
            </>
        ),
        slug: 'chat-with-friends',
    },
    {
        src: userSettings,
        alt: 'user profile settings screen where users can customize their avatar and bio',
        caption: (
            <>
                <b>stand out from the crowd.</b> upload an image to represent
                your custom avatar, write a personalized bio for yourself, and
                choose a banner color for your profile. view anyone's profile by
                clicking on their username or avatar
            </>
        ),
        slug: 'custom-profile',
    },
    {
        src: login,
        alt: 'login screen for logging in to an existing account or using a guest account',
        caption: (
            <>
                <b>register your custom username</b> by creating an account with
                an email and password you can use to login, or use a temporary
                guest account for quick access with restricted privileges
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
                            rel="noreferrer"
                            className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                        >
                            view project
                        </a>

                        <a
                            href="https://github.com/DevlinRocha/banter"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                        >
                            source code
                        </a>
                    </aside>

                    <section className="flex w-full flex-col items-center gap-8 bg-sky-100 py-16">
                        <header className="w-full px-7 2xs:px-8 xs:px-10 sm:px-12 md:order-2 md:px-[12lvw] xl:px-[calc(50%-490px)]">
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
