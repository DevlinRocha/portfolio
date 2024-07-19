import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
    component: About,
})

function About() {
    return (
        <main className="flex flex-col items-center gap-6">
            <section className="flex w-[87.5lvw] max-w-prose flex-col gap-4 text-pretty text-sm leading-7 md:text-base md:leading-7">
                <h1 className="-mb-2 w-full pt-9 font-serif text-3xl font-semibold leading-9 md:pt-14 md:text-5xl lg:text-6xl">
                    i'm Devlin,
                </h1>

                <p>
                    a music, gaming, and tech enthusiast with a passion for
                    design, creation, and collaboration
                </p>

                <p>
                    my passion for technology is life-long, stemming from a
                    childhood full of video games. it wasn't long before i was
                    taking consoles apart, building computers, and diving into
                    programming
                </p>

                <p>
                    in addition to programming and video games, my hobbies
                    include music/audio production, content creation, and
                    hanging out with my dog, Charlie
                </p>
            </section>

            <figure className="flex w-[87.5lvw] select-none flex-col items-center">
                <img
                    src="about.png"
                    width={1280}
                    height={720}
                    draggable={false}
                    alt="me sitting with my laptop"
                    className="max-h-[512px] w-auto rounded-2xl object-contain md:max-h-[656px] lg:max-h-[768px]"
                />
            </figure>
        </main>
    )
}
