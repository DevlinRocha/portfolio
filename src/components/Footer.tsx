function Footer() {
    return (
        <footer>
            <hr />
            <div className="flex justify-between p-4">
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
