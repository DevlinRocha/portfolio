import { useRef } from 'react'
import { Link } from '@tanstack/react-router'

function Nav() {
    const menu = useRef<HTMLInputElement>(null)

    function handleClick() {
        if (!menu.current) return

        menu.current.checked = false
    }

    return (
        <nav className="xs:px-2 sticky top-0 z-10 flex h-12 select-none bg-white text-black/80 lg:px-32 xl:px-64 2xl:px-80">
            <div className="flex h-full w-full items-center justify-between">
                <Link
                    to="/"
                    className="transition-text flex h-full items-center text-nowrap px-4 hover:text-black"
                >
                    Devlin Rocha
                </Link>

                <input
                    type="checkbox"
                    id="menu"
                    ref={menu}
                    className="peer/menu hidden"
                />
                <label
                    htmlFor="menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    className="xs:hidden z-20 flex h-full w-12 cursor-pointer flex-col items-center justify-center peer-checked/menu:*:absolute peer-checked/menu:*:mb-0 peer-checked/menu:[&>*:first-child]:rotate-[135deg] peer-checked/menu:[&>*:last-child]:-rotate-[135deg]"
                >
                    <span className="transition-layout-transform mb-1.5 h-[1.6px] w-4 bg-black duration-500" />
                    <span className="transition-layout-transform h-[1.6px] w-4 bg-black duration-500" />
                </label>

                <ul className="transition-layout xs:transition-none xs:flex-row xs:max-h-none peer-checked/menu:xs:max-h-none peer-checked/menu:xs:pt-0 xs:static xs:w-auto xs:h-full xs:items-center xs:text-sm xs:pt-0 absolute top-0 flex h-lvh max-h-0 w-full flex-col overflow-hidden bg-white text-2xl duration-500 ease-in peer-checked/menu:max-h-lvh peer-checked/menu:pt-12">
                    <li className="xs:h-full">
                        <Link
                            to="/"
                            onClick={handleClick}
                            className="transition-text xs:py-0 xs:px-2 xs:h-full flex items-center px-12 py-2 hover:text-black sm:px-4 [&.active]:font-semibold"
                        >
                            home
                        </Link>
                    </li>

                    <li className="xs:h-full group">
                        <a
                            href="/#projects"
                            onClick={handleClick}
                            className="transition-text xs:px-2 xs:py-0 xs:h-full group-hover:xs:text-black group relative flex items-center px-12 py-2 hover:text-black sm:px-4"
                        >
                            projects
                        </a>

                        <ul className="transition-height xs:w-auto xs:absolute xs:max-h-0 group-hover:xs:max-h-96 group-hover:xs:border-x group-hover:xs:border-b z-10 w-full flex-col overflow-hidden border-0 bg-white duration-500 ease-in">
                            <li className="flex">
                                <Link
                                    to="/banter"
                                    onClick={handleClick}
                                    className="transition-text xs:p-4 w-full px-16 py-2 hover:text-black [&.active]:font-semibold"
                                >
                                    Banter
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/vvordle"
                                    onClick={handleClick}
                                    className="transition-text xs:p-4 w-full px-16 py-2 hover:text-black [&.active]:font-semibold"
                                >
                                    VVordle
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/pokemon-roulette"
                                    onClick={handleClick}
                                    className="transition-text xs:p-4 w-full px-16 py-2 hover:text-black [&.active]:font-semibold"
                                >
                                    Pokémon Roulette
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/wheres-waldo"
                                    onClick={handleClick}
                                    className="transition-text xs:p-4 w-full px-16 py-2 hover:text-black [&.active]:font-semibold"
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
                            className="transition-text xs:px-2 xs:py-0 xs:h-full flex items-center px-12 py-2 hover:text-black sm:px-4 [&.active]:font-semibold"
                        >
                            about
                        </Link>
                    </li>

                    <li className="xs:h-full">
                        <a
                            href="https://drive.google.com/file/d/1noU2L9hSqgo2zLrzT_YK2f4MNmeDIg8X/view?usp=sharing"
                            target="_blank"
                            rel="noReferrer"
                            onClick={handleClick}
                            className="transition-text xs:py-0 xs:px-2 xs:h-full flex items-center px-12 py-2 hover:text-black sm:px-4"
                        >
                            résumé
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav
