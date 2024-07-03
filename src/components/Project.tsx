import { Link } from '@tanstack/react-router'

interface ProjectProps {
    name: string
}

function Project({ name }: ProjectProps) {
    function formatString(string: string) {
        return string
            .replace(/[^\w\s]|_/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase()
    }

    return (
        <Link
            to={`/${formatString(name)}`}
            className="flex flex-col items-center drop-shadow-2xl"
        >
            <img
                src={`/${formatString(name)}.png`}
                alt={''}
                className="rounded-lg"
            />
            <span>{name}</span>
        </Link>
    )
}

export default Project
