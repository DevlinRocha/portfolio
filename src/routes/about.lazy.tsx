import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
    component: About,
})

function About() {
    return (
        <main className="mx-5 mt-8 flex flex-col gap-16 lg:mx-32 lg:mt-24 xl:mx-64 2xl:mx-80">
            <div className="flex flex-col gap-2 xl:gap-8">
                <h1 className="xs:text-5xl font-serif text-4xl font-semibold sm:text-6xl">
                    i&apos;m Devlin,
                </h1>

                <div className="2xs:text-base 2xs:leading-7 mt-4 flex flex-col gap-8 text-pretty text-sm leading-7 sm:mt-8 xl:mt-0">
                    <p>
                        a music, gaming, and tech enthusiast with a passion for
                        design, creation, and collaboration
                    </p>

                    <p>
                        my passion for technology is life-long, stemming from a
                        childhood full of video games. it wasn&apos;t long
                        before i was taking consoles apart, building computers,
                        and diving into programming
                    </p>

                    <p>
                        in addition to programming and video games, my hobbies
                        include music / audio production, video editing /
                        content creation, and hanging out with my dog, Charlie
                    </p>
                </div>
            </div>

            <div className="2xs:gap-8 xs:gap-10 flex w-full select-none flex-col items-center gap-4 2xl:gap-16">
                <img
                    src="about.png"
                    alt="me sitting with my laptop"
                    width={1920}
                    height={1080}
                    className="max-h-[1080px] w-auto rounded-2xl object-contain"
                />
            </div>
        </main>
    )
}
