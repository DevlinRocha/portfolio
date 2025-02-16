import { FormEvent, useRef } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

export default function BlogNav() {
    const input = useRef<HTMLInputElement>(null)
    const navigate = useNavigate({ from: '/blog' })

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const query = input.current?.value
        if (!query) return

        navigate({
            to: '/blog/search',
            search: { query },
        })
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
                    <input
                        ref={input}
                        placeholder="Search Blog"
                        className="focus:outline-none"
                    />
                </form>
            </nav>
        </header>
    )
}
