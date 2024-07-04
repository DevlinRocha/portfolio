function Footer() {
    return (
        <footer className="h-64">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
                <div className="flex gap-4">
                    <a
                        href="https://twitter.com/DevlinRocha"
                        target="_blank"
                        rel="noReferrer"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://github.com/DevlinRocha"
                        target="_blank"
                        rel="noReferrer"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/DevlinRocha"
                        target="_blank"
                        rel="noReferrer"
                    >
                        LinkedIn
                    </a>
                </div>

                <span>designed and developed by Devlin Rocha</span>
            </div>
        </footer>
    )
}

export default Footer
