import { Link } from '@tanstack/react-router'

function Nav() {
    return (
        <nav className="xs:px-2 sticky top-0 z-10 flex h-12 select-none bg-white text-black/80 lg:px-32 xl:px-64 2xl:px-80">
            <div className="flex h-full w-full items-center justify-between">
                <Link
                    to="/"
                    className="transition-text flex h-full items-center text-nowrap px-4 hover:text-black"
                >
                    Devlin Rocha
                </Link>

                <input type="checkbox" id="menu" className="peer/menu hidden" />
                <label
                    htmlFor="menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    className="xs:hidden flex h-full w-12 cursor-pointer flex-col items-center justify-center gap-1.5"
                >
                    <span className="h-[1.6px] w-4 bg-black" />
                    <span className="h-[1.6px] w-4 bg-black" />
                </label>

                <ul className="xs:flex hidden h-full items-center text-sm peer-checked/menu:flex">
                    <li className="h-full">
                        <Link
                            to="/"
                            className="transition-text flex h-full items-center px-2 hover:text-black sm:px-4 md:px-5 [&.active]:font-semibold"
                        >
                            home
                        </Link>
                    </li>

                    <li className="group h-full">
                        <a
                            href="/#projects"
                            className="transition-text group relative flex h-full items-center px-2 group-hover:text-black sm:px-4 md:px-5"
                        >
                            projects
                        </a>

                        <ul className="transition-height absolute z-10 max-h-0 flex-col overflow-clip border-0 bg-white duration-500 ease-in group-hover:max-h-96 group-hover:border-x group-hover:border-b">
                            <li className="flex">
                                <Link
                                    to="/banter"
                                    className="transition-text w-full p-4 hover:text-black sm:px-4 md:px-5 [&.active]:font-semibold"
                                >
                                    Banter
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/vvordle"
                                    className="transition-text w-full p-4 hover:text-black sm:px-4 md:px-5 [&.active]:font-semibold"
                                >
                                    VVordle
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/pokemon-roulette"
                                    className="transition-text w-full p-4 hover:text-black sm:px-4 md:px-5 [&.active]:font-semibold"
                                >
                                    Pokémon Roulette
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/wheres-waldo"
                                    className="transition-text w-full p-4 hover:text-black sm:px-4 md:px-5 [&.active]:font-semibold"
                                >
                                    Where's Waldo?
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="h-full">
                        <Link
                            to="/about"
                            className="transition-text flex h-full items-center px-2 hover:text-black sm:px-4 md:px-5 [&.active]:font-semibold"
                        >
                            about
                        </Link>
                    </li>

                    <li className="h-full">
                        <a
                            href="https://drive.google.com/file/d/1noU2L9hSqgo2zLrzT_YK2f4MNmeDIg8X/view?usp=sharing"
                            target="_blank"
                            rel="noReferrer"
                            className="transition-text flex h-full items-center px-2 hover:text-black sm:px-4"
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
