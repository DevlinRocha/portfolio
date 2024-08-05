import { useRef } from 'react'
import { Link } from '@tanstack/react-router'

export default function Nav() {
    const menu = useRef<HTMLInputElement>(null)

    function handleClick() {
        if (!menu.current) return

        menu.current.checked = false
    }

    return (
        <header className="sticky top-0 z-10 flex h-12 select-none justify-center bg-white/80 text-black/80 backdrop-blur">
            <nav className="flex h-full w-full max-w-[1152px] items-center justify-between">
                <Link
                    to="/"
                    className="flex h-full items-center text-nowrap px-4 transition-text hover:text-black"
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
                    aria-controls="menu"
                    className="z-20 flex h-full w-12 cursor-pointer flex-col items-center justify-center peer-checked/menu:*:absolute peer-checked/menu:*:mb-0 xs:hidden peer-checked/menu:[&>*:first-child]:rotate-[135deg] peer-checked/menu:[&>*:last-child]:-rotate-[135deg]"
                >
                    <span className="mb-1.5 h-[1.6px] w-4 bg-black transition-layout-transform duration-500" />
                    <span className="h-[1.6px] w-4 bg-black transition-layout-transform duration-500" />
                </label>

                <ul
                    id="menu"
                    className="absolute top-0 flex h-lvh max-h-0 w-full flex-col overflow-hidden bg-white text-2xl transition-layout duration-500 ease-in peer-checked/menu:max-h-lvh peer-checked/menu:pt-12 xs:static xs:h-full xs:max-h-none xs:w-auto xs:flex-row xs:items-center xs:bg-inherit xs:pt-0 xs:text-sm xs:transition-none peer-checked/menu:xs:max-h-none peer-checked/menu:xs:pt-0"
                >
                    <li className="xs:h-full">
                        <Link
                            to="/"
                            onClick={handleClick}
                            className="flex items-center px-12 py-2 transition-text hover:text-black xs:h-full xs:px-2 xs:py-0 [&.active]:font-semibold"
                        >
                            home
                        </Link>
                    </li>

                    <li className="group xs:h-full">
                        <Link
                            to="/"
                            hash="projects"
                            onClick={handleClick}
                            className="relative flex items-center px-12 py-2 transition-text hover:text-black xs:h-full xs:px-2 xs:py-0 group-hover:xs:text-black"
                        >
                            projects
                        </Link>

                        <ul className="flex-col overflow-hidden border-0 bg-white/80 backdrop-blur transition-height duration-500 ease-in xs:absolute xs:max-h-0 group-hover:xs:max-h-96 group-hover:xs:border-x group-hover:xs:border-b">
                            <li className="flex">
                                <Link
                                    to="/banter"
                                    onClick={handleClick}
                                    className="w-full py-2 pl-16 pr-12 transition-text hover:text-black xs:p-4 [&.active]:font-semibold"
                                >
                                    Banter
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/vvordle"
                                    onClick={handleClick}
                                    className="w-full py-2 pl-16 pr-12 transition-text hover:text-black xs:p-4 [&.active]:font-semibold"
                                >
                                    VVordle
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/pokemon-roulette"
                                    onClick={handleClick}
                                    className="w-full py-2 pl-16 pr-12 transition-text hover:text-black xs:p-4 [&.active]:font-semibold"
                                >
                                    Pokémon Roulette
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/wheres-waldo"
                                    onClick={handleClick}
                                    className="w-full py-2 pl-16 pr-12 transition-text hover:text-black xs:p-4 [&.active]:font-semibold"
                                >
                                    Where's Waldo?
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="xs:h-full">
                        <Link
                            to="/about"
                            onClick={handleClick}
                            className="flex items-center px-12 py-2 transition-text hover:text-black xs:h-full xs:px-2 xs:py-0 [&.active]:font-semibold"
                        >
                            about
                        </Link>
                    </li>

                    <li className="xs:h-full">
                        <a
                            href="https://drive.google.com/file/d/1Qbrjy7o_HkxuGYKRsB2ZuNPf0uYZzmYD/view?usp=sharing"
                            target="_blank"
                            rel="noopener"
                            onClick={handleClick}
                            className="flex items-center px-12 py-2 transition-text hover:text-black xs:h-full xs:px-2 xs:py-0"
                        >
                            résumé
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
