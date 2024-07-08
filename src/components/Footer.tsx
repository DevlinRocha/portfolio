function Footer() {
    return (
        <footer className="h-64">
            <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
                <div className="flex select-none gap-4 text-black/80">
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

                <span className="text-black/70">
                    designed and developed by Devlin Rocha
                </span>
            </div>
        </footer>
    )
}

export default Footer
