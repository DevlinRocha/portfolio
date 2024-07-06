import { Link } from '@tanstack/react-router'

function Nav() {
    return (
        <nav className="z-10 m-3 mx-8 flex h-16 select-none items-end bg-white lg:mx-32 xl:mx-64 2xl:mx-80">
            <div className="flex w-full items-center justify-between">
                <Link to="/" className="text-nowrap py-2 sm:px-5">
                    Devlin Rocha
                </Link>

                <div className="flex text-sm">
                    <Link
                        to="/"
                        className="px-2 py-2 sm:px-5 [&.active]:font-semibold"
                    >
                        home
                    </Link>
                    <Link
                        to="/about"
                        className="px-2 py-2 sm:px-5 [&.active]:font-semibold"
                    >
                        about
                    </Link>
                    <a
                        href="https://drive.google.com/file/d/1noU2L9hSqgo2zLrzT_YK2f4MNmeDIg8X/view?usp=sharing"
                        target="_blank"
                        rel="noReferrer"
                        className="px-2 py-2 sm:px-5"
                    >
                        résumé
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Nav
