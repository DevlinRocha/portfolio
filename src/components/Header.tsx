interface HeaderProps {
    heading: string
    className?: string
}

function Header({ heading, className }: HeaderProps) {
    return (
        <header
            className={`w-full max-w-[2560px] py-14 text-center ${className}`}
        >
            <h1 className="font-display text-5xl">{heading}</h1>
        </header>
    )
}

export default Header
