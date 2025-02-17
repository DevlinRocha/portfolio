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
            <nav className="flex h-full w-full max-w-[1152px] items-center justify-between pl-4 pr-2">
                <Link
                    to="/blog"
                    onClick={handleClick}
                    className="transition-text flex h-full items-center text-nowrap text-xl font-semibold hover:text-black"
                >
                    Blog
                </Link>

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
                    <span>Search Blog</span>
                </label>

                <div className="transition-layout absolute left-0 top-12 flex h-lvh max-h-0 w-full flex-col items-center overflow-hidden bg-white duration-500 ease-in peer-checked/search:max-h-lvh peer-checked/search:pt-8">
                    <form
                        id="search"
                        onSubmit={(event) => handleSubmit(event)}
                        className="transition-text w-full max-w-[1152px] px-4 text-2xl"
                    >
                        <input
                            ref={input}
                            type="search"
                            placeholder="Search Blog"
                            aria-label="Search blog posts"
                            className="w-full placeholder:text-neutral-500 focus:outline-none"
                        />
                    </form>
                </div>
            </nav>
        </header>
    )
}
