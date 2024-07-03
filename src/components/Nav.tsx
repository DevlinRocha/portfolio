import { Link } from '@tanstack/react-router'

function Nav() {
    return (
        <nav className="sticky top-0 z-10 bg-white">
            <div className="flex gap-2 p-4">
                <Link to="/" className="[&.active]:font-bold">
                    home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    about
                </Link>
                <a
                    href="https://drive.google.com/file/d/1DTqIS7jxcQzt12IpAFkbrl4z3anU3q5l/view?usp=sharing"
                    target="_blank"
                    rel="noReferrer"
                >
                    résumé
                </a>
            </div>
            <hr />
        </nav>
    )
}

export default Nav
