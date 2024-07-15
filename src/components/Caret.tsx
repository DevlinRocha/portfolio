interface CaretProps {
    onClick?: React.MouseEventHandler
    className?: string
}

function Caret({ onClick, className }: CaretProps) {
    return (
        <svg
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <rect
                width="5"
                height="5"
                rx="2.5"
                fill="#424245"
                fill-opacity="0.72"
            />
            <path
                d="M2 2.5L3 1.5"
                stroke="white"
                stroke-width="0.5"
                stroke-linecap="round"
            />
            <path
                d="M2 2.5L3 3.5"
                stroke="white"
                stroke-width="0.5"
                stroke-linecap="round"
            />
        </svg>
    )
}

export default Caret
