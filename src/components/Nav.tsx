import { Link } from '@tanstack/react-router'

function Nav() {
    return (
        <nav className="z-10 m-3 mx-8 flex h-16 items-end justify-between bg-white lg:mx-32 xl:mx-64 2xl:mx-80">
            <Link to="/" className="px-5 py-2">
                Devlin Rocha
            </Link>

            <div className="flex text-sm">
                <Link to="/" className="px-5 py-2 [&.active]:font-bold">
                    home
                </Link>
                <Link to="/about" className="px-5 py-2 [&.active]:font-bold">
                    about
                </Link>
                <a
                    href="https://drive.google.com/file/d/1DTqIS7jxcQzt12IpAFkbrl4z3anU3q5l/view?usp=sharing"
                    target="_blank"
                    rel="noReferrer"
                    className="px-5 py-2"
                >
                    résumé
                </a>
            </div>
        </nav>
    )
}

export default Nav
