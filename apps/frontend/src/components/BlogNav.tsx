import { FormEvent, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { trpc } from '@/api/trpcClient'

export default function BlogNav() {
    const input = useRef<HTMLInputElement>(null)

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const inputValue = input.current?.value
        if (!inputValue) return

        const results = trpc.getPosts.useQuery({ title: inputValue })
        console.log(results)
    }

    return (
        <header className="sticky top-0 z-10 flex h-12 select-none justify-center bg-white/80 text-black/80 backdrop-blur">
            <nav className="flex h-full w-full max-w-[1152px] items-center justify-between">
                <Link
                    to="/blog"
                    className="transition-text flex h-full items-center text-nowrap px-4 hover:text-black"
                >
                    Blog
                </Link>

                <form onSubmit={(event) => handleSubmit(event)}>
                    <input ref={input} placeholder="Search Blog" />
                </form>
            </nav>
        </header>
    )
}
