import { Link } from '@tanstack/react-router'

function Footer() {
    return (
        <footer className="flex h-full flex-col items-center justify-center gap-4 p-4 text-black/80">
            <div className="flex select-none gap-4">
                <a
                    href="https://twitter.com/DevlinRocha"
                    target="_blank"
                    rel="noReferrer"
                    className="transition-text hover:text-black hover:underline"
                >
                    Twitter
                </a>
                <a
                    href="https://github.com/DevlinRocha"
                    target="_blank"
                    rel="noReferrer"
                    className="transition-text hover:text-black hover:underline"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/DevlinRocha"
                    target="_blank"
                    rel="noReferrer"
                    className="transition-text hover:text-black hover:underline"
                >
                    LinkedIn
                </a>
            </div>

            <Link
                to="/"
                hash="home"
                className="text-balance text-center transition-text hover:text-black hover:underline"
            >
                designed and developed by Devlin Rocha
            </Link>
        </footer>
    )
}

export default Footer
