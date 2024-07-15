interface CaretProps {
    onClick?: React.MouseEventHandler
    className?: string
}

function Caret({ onClick, className }: CaretProps) {
    return (
        <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <path
                d="M2 6L7 1"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M2 6L7 11"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}

export default Caret
