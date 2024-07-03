import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/wheres-waldo')({
    component: wheresWaldo,
})

function wheresWaldo() {
    return (
        <div className="flex h-auto w-full flex-col gap-8 p-8 lg:gap-8 lg:p-16">
            <h1 className="text-4xl">Where's Waldo?</h1>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:gap-16">
                <img
                    src="wheres-waldo.png"
                    className="rounded-lg drop-shadow-2xl"
                    width={1280}
                    height={720}
                />

                <img
                    src="wheres-waldo-guess.png"
                    className="hidden rounded-lg drop-shadow-2xl sm:block"
                    width={1280}
                    height={720}
                />
            </div>

            <p>
                Where's Waldo? is a fullstack open source web version of the
                iconic book series, built with <b>TypeScript</b>, <b>React</b>,{' '}
                <b>React Router</b>, <b>styled-components</b>, and{' '}
                <b>Firebase</b>
            </p>

            <p>
                Where's Waldo? was my first time working with a backend, as well
                as my first time working with TypeScript
            </p>

            <img
                src="wheres-waldo-guess.png"
                className="block rounded-lg drop-shadow-2xl sm:hidden"
                width={1280}
                height={720}
            />

            <img
                src="wheres-waldo-bottom.png"
                className="rounded-lg drop-shadow-2xl"
                width={1280}
                height={720}
            />
        </div>
    )
}
