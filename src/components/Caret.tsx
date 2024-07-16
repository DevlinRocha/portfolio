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
            className={`group ${className}`}
        >
            <rect
                width="5"
                height="5"
                rx="2.5"
                fill="#424245"
                fillOpacity="0.72"
                className="transition-colors group-hover:fill-neutral-600"
            />
            <path
                d="M2 2.5L3 1.5"
                stroke="#F5F5F5"
                strokeWidth="0.5"
                strokeLinecap="round"
                className="transition-colors group-hover:stroke-white"
            />
            <path
                d="M2 2.5L3 3.5"
                stroke="#F5F5F5"
                strokeWidth="0.5"
                strokeLinecap="round"
                className="transition-colors group-hover:stroke-white"
            />
        </svg>
    )
}

export default Caret
