interface CaretProps {
    disabled?: boolean
    onClick?: React.MouseEventHandler
    className?: string
}

function Caret({ disabled, onClick, className }: CaretProps) {
    return (
        <svg
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-disabled={disabled}
            onClick={disabled ? undefined : onClick}
            className={`group cursor-pointer aria-disabled:cursor-default ${className}`}
        >
            <rect
                width="5"
                height="5"
                rx="2.5"
                aria-disabled={disabled}
                className="fill-neutral-600/70 transition-colors group-hover:fill-neutral-600 aria-disabled:fill-neutral-600/35 aria-disabled:group-hover:fill-neutral-600/35"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.75474 2.54856C1.76399 2.59554 1.78682 2.64038 1.82322 2.67678L1.8244 2.67795L2.82322 3.67677C2.92085 3.77441 3.07915 3.77441 3.17678 3.67677C3.27441 3.57914 3.27441 3.42085 3.17678 3.32322L2.35355 2.5L3.17677 1.67678C3.27441 1.57915 3.27441 1.42085 3.17677 1.32322C3.07914 1.22559 2.92085 1.22559 2.82322 1.32322L1.82322 2.32322C1.79882 2.34763 1.78051 2.37583 1.76831 2.40592C1.7499 2.45132 1.74537 2.50104 1.75474 2.54856Z"
                aria-disabled={disabled}
                className="fill-white/80 transition-colors group-hover:fill-white aria-disabled:fill-white/70 aria-disabled:group-hover:fill-white/70"
            />
        </svg>
    )
}

export default Caret
