function Footer() {
    return (
        <footer>
            <hr />
            <div className="flex flex-col-reverse items-center justify-between p-4 sm:flex-row">
                <span>designed and developed by Devlin Rocha</span>
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
            </div>
        </footer>
    )
}

export default Footer
