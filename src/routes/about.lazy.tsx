import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
    component: About,
})

function About() {
    return (
        <div className="flex flex-col gap-4 p-16">
            <h1>i&apos;m Devlin,</h1>
            <p>
                a music, gaming, and tech enthusiast with a passion for design,
                creation, and collaboration!
            </p>
            <p>
                my passion for technology is life-long, stemming from a
                childhood full of video games. it wasn&apos;t long before i was
                taking consoles apart, building computers, and diving into
                programming
            </p>
            <p>
                in addition to programming and video games, my hobbies include
                music / audio production, video editing / content creation, and
                hanging out with my dog, Charlie
            </p>
        </div>
    )
}
