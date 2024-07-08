import { Link } from '@tanstack/react-router'

function Nav() {
    return (
        <nav className="m-3 mx-5 flex h-16 select-none items-end bg-white text-black/80 lg:mx-32 xl:mx-64 2xl:mx-80">
            <div className="flex w-full items-center justify-between">
                <Link
                    to="/"
                    className="transition-text text-nowrap py-2 hover:text-black sm:px-5"
                >
                    Devlin Rocha
                </Link>

                <ul className="flex items-center text-sm">
                    <li>
                        <Link
                            to="/"
                            className="transition-text p-2 hover:text-black sm:px-5 [&.active]:font-semibold"
                        >
                            home
                        </Link>
                    </li>

                    <li className="group">
                        <a
                            href="/#projects"
                            className="transition-text group relative p-2 group-hover:text-black sm:px-5"
                        >
                            projects
                        </a>

                        <ul className="transition-height absolute z-10 max-h-0 flex-col overflow-clip border-0 bg-white duration-500 ease-in group-hover:max-h-96 group-hover:border-x group-hover:border-b">
                            <li className="flex">
                                <Link
                                    to="/banter"
                                    className="transition-text p-4 hover:text-black sm:px-5 [&.active]:font-semibold"
                                >
                                    Banter
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/vvordle"
                                    className="transition-text p-4 hover:text-black sm:px-5 [&.active]:font-semibold"
                                >
                                    VVordle
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/pokemon-roulette"
                                    className="transition-text p-4 hover:text-black sm:px-5 [&.active]:font-semibold"
                                >
                                    Pokémon Roulette
                                </Link>
                            </li>

                            <li className="flex">
                                <Link
                                    to="/wheres-waldo"
                                    className="transition-text p-4 hover:text-black sm:px-5 [&.active]:font-semibold"
                                >
                                    Where's Waldo?
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link
                            to="/about"
                            className="transition-text p-2 hover:text-black sm:px-5 [&.active]:font-semibold"
                        >
                            about
                        </Link>
                    </li>

                    <li>
                        <a
                            href="https://drive.google.com/file/d/1noU2L9hSqgo2zLrzT_YK2f4MNmeDIg8X/view?usp=sharing"
                            target="_blank"
                            rel="noReferrer"
                            className="transition-text p-2 hover:text-black sm:px-5"
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
