import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
    component: About,
})

function About() {
    return (
        <main className="mx-8 mt-24 flex flex-col gap-8 text-pretty lg:mx-32 xl:mx-64 2xl:mx-80 3xl:mx-96">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
                i&apos;m Devlin,
            </h1>
            <p>
                a music, gaming, and tech enthusiast with a passion for design,
                creation, and collaboration!
            </p>
            <p>
                my passion for technology is life-long, stemming from a
                childhood full of video games. it wasn&apos;t long before i was
                taking consoles apart, building computers, and maining into
                programming
            </p>
            <p>
                in addition to programming and video games, my hobbies include
                music / audio production, video editing / content creation, and
                hanging out with my dog, Charlie
            </p>

            <div className="flex w-full flex-col items-center gap-8 2xl:gap-16">
                <img
                    src="about.png"
                    width={1920}
                    height={1080}
                    className="h-[1080px] w-auto rounded-2xl object-contain"
                />
            </div>
        </main>
    )
}
