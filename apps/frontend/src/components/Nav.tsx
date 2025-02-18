import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { projects } from '@/data/glossary'

type NavProps = {
    disableMenu?: boolean
}

export default function Nav({ disableMenu = false }: NavProps) {
    const menu = useRef<HTMLInputElement>(null)

    function handleClick() {
        if (!menu.current) return

        menu.current.checked = false
    }

    return (
        <header className="sticky top-0 z-10 flex h-12 select-none justify-center bg-white/80 text-black/80 backdrop-blur has-[:checked]:z-20">
            <nav className="flex h-full w-full max-w-[1032px] items-center justify-between">
                <Link
                    to="/"
                    className="transition-text flex h-full items-center text-nowrap px-5 hover:text-black"
                >
                    Devlin Rocha
                </Link>

                <input
                    type="checkbox"
                    id="menu-toggle"
                    ref={menu}
                    aria-expanded={menu?.current?.checked || false}
                    className="peer/menu hidden"
                />
                <label
                    htmlFor="menu-toggle"
                    role="checkbox"
                    aria-controls="menu"
                    className="xs:hidden z-20 flex h-full w-12 cursor-pointer flex-col items-center justify-center peer-checked/menu:*:absolute peer-checked/menu:*:mb-0 peer-checked/menu:[&>*:first-child]:rotate-[135deg] peer-checked/menu:[&>*:last-child]:-rotate-[135deg]"
                >
                    <span className="transition-layout-transform mb-1.5 h-[1.6px] w-4 bg-black duration-500" />
                    <span className="transition-layout-transform h-[1.6px] w-4 bg-black duration-500" />
                </label>

                <ul
                    id="menu"
                    className="transition-layout xs:static xs:h-full xs:max-h-none xs:w-auto xs:flex-row xs:items-center xs:bg-inherit xs:pt-0 xs:text-sm xs:transition-none peer-checked/menu:xs:max-h-none peer-checked/menu:xs:pt-0 absolute top-0 flex h-lvh max-h-0 w-full flex-col overflow-hidden bg-white pr-3 text-2xl duration-500 ease-in peer-checked/menu:max-h-lvh peer-checked/menu:pt-12"
                >
                    <li className="xs:h-full">
                        <Link
                            to="/"
                            onClick={handleClick}
                            className="transition-text xs:h-full xs:px-2 xs:py-0 flex items-center px-12 py-2 hover:text-black [&.active]:font-semibold"
                        >
                            home
                        </Link>
                    </li>

                    <li className={`xs:h-full ${disableMenu ? '' : 'group'}`}>
                        <Link
                            to="/"
                            hash="projects"
                            onClick={handleClick}
                            className="transition-text xs:h-full xs:px-2 xs:py-0 group-hover:xs:text-black flex items-center px-12 py-2 hover:text-black"
                        >
                            projects
                        </Link>

                        <ul className="transition-height xs:absolute xs:max-h-0 group-hover:xs:max-h-96 group-hover:xs:border-x group-hover:xs:border-b flex-col overflow-hidden border-0 bg-white/80 backdrop-blur duration-500 ease-in">
                            {Object.entries(projects).map(
                                ([key, { name, slug }]) => {
                                    return (
                                        <li key={key} className="flex">
                                            <Link
                                                to={slug}
                                                onClick={handleClick}
                                                className="transition-text xs:p-4 w-full py-2 pl-16 pr-12 hover:text-black [&.active]:font-semibold"
                                            >
                                                {name}
                                            </Link>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </li>

                    <li className="xs:h-full">
                        <Link
                            to="/blog"
                            onClick={handleClick}
                            className="transition-text xs:h-full xs:px-2 xs:py-0 flex items-center px-12 py-2 hover:text-black [&.active]:font-semibold"
                        >
                            blog
                        </Link>
                    </li>

                    <li className="xs:h-full">
                        <Link
                            to="/about"
                            onClick={handleClick}
                            className="transition-text xs:h-full xs:px-2 xs:py-0 flex items-center px-12 py-2 hover:text-black [&.active]:font-semibold"
                        >
                            about
                        </Link>
                    </li>

                    <li className="xs:h-full">
                        <a
                            href="https://drive.google.com/file/d/1Qbrjy7o_HkxuGYKRsB2ZuNPf0uYZzmYD/view?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                            onClick={handleClick}
                            className="transition-text xs:h-full xs:px-2 xs:py-0 flex items-center px-12 py-2 hover:text-black"
                        >
                            résumé
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
