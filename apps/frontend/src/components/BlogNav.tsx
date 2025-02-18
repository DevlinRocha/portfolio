import { FormEvent, useRef } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

export default function BlogNav() {
    const input = useRef<HTMLInputElement>(null)
    const search = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    function handleClick() {
        if (!input.current) return

        input.current.value = ''

        if (!search.current) return

        search.current.checked = false
        handleChange()
    }

    function handleChange() {
        if (!input.current || !search.current) return

        const label = search.current.labels
            ? search.current.labels[0]
            : search.current

        if (!search.current.checked) return (label.textContent = 'Search Blog')

        input.current.focus()
        label.textContent = 'Close'
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const query = String(input.current?.value).trim()
        if (!query) return

        navigate({
            to: '/blog/search',
            search: { query },
        })

        if (!search.current) return

        search.current.checked = false
        handleChange()
    }

    return (
        <header className="sticky top-0 z-10 flex h-12 select-none justify-center bg-white/80 text-black/80 backdrop-blur">
            <nav className="flex h-full w-full max-w-[1032px] items-center justify-between px-5">
                <Link
                    to="/blog"
                    onClick={handleClick}
                    className="transition-text flex h-full items-center text-nowrap text-xl font-semibold hover:text-black"
                >
                    Blog
                </Link>

                <section className="flex gap-6">
                    <ul className="flex items-center gap-10 text-xs">
                        <li>
                            <Link
                                to="/blog/search"
                                search={{
                                    category: 'Software',
                                }}
                                onClick={handleClick}
                            >
                                Software
                            </Link>
                        </li>
                    </ul>

                    <input
                        type="checkbox"
                        onChange={handleChange}
                        id="search-toggle"
                        ref={search}
                        aria-expanded={search?.current?.checked || false}
                        className="peer/search hidden"
                    />
                    <label
                        htmlFor="search-toggle"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                search.current?.click()
                            }
                        }}
                        aria-controls="search"
                        className="flex cursor-pointer items-center rounded-xl bg-gray-200 px-3 py-1 text-xs"
                    >
                        Search Blog
                    </label>

                    <div className="transition-layout absolute left-0 top-12 flex h-lvh max-h-0 w-full flex-col items-center overflow-hidden bg-white duration-500 ease-in peer-checked/search:max-h-lvh">
                        <form
                            id="search"
                            onSubmit={(event) => handleSubmit(event)}
                            className="transition-text w-full max-w-[1032px] px-5 pt-8"
                        >
                            <input
                                ref={input}
                                type="search"
                                placeholder="Search Blog"
                                aria-label="Search blog posts"
                                className="w-full pr-8 text-2xl font-semibold text-zinc-900 placeholder:text-neutral-500 focus:outline-none"
                            />
                        </form>

                        <section className="w-full max-w-[1032px] px-5 pb-16 pt-10">
                            <h2 className="mb-5 text-xs font-bold text-neutral-500">
                                Quick Links
                            </h2>
                            <ul className="flex flex-col gap-4 text-lg font-semibold">
                                <li>
                                    <Link
                                        to="/blog/search"
                                        search={{
                                            tag: '100 Days Of Code',
                                        }}
                                        onClick={handleClick}
                                    >
                                        100 Days Of Code
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </div>
                </section>
            </nav>
        </header>
    )
}
