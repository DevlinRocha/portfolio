import { Link } from '@tanstack/react-router'

export default function Footer() {
    return (
        <footer className="flex h-full flex-col items-center justify-center gap-4 p-4 text-xs text-black/80">
            <nav className="flex select-none flex-wrap justify-center gap-4 text-balance">
                <a
                    href="https://www.twitch.tv/DevlinRochaa"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-text hover:text-black hover:underline"
                >
                    Twitch
                </a>
                <a
                    href="https://www.youtube.com/@DevlinRochaa"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-text hover:text-black hover:underline"
                >
                    YouTube
                </a>
                <a
                    href="https://twitter.com/DevlinRocha"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-text hover:text-black hover:underline"
                >
                    Twitter
                </a>
                <a
                    href="https://github.com/DevlinRocha"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-text hover:text-black hover:underline"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/DevlinRocha"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-text hover:text-black hover:underline"
                >
                    LinkedIn
                </a>
            </nav>

            <Link
                to="/"
                className="transition-text text-balance text-center hover:text-black hover:underline"
            >
                designed and developed by Devlin Rocha
            </Link>
        </footer>
    )
}
