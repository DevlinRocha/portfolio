import { Link } from '@tanstack/react-router'

interface ProjectProps {
    name: string
}

function Project({ name }: ProjectProps) {
    function formatString(string: string) {
        return string
            .normalize('NFKD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/[^\w\s]|_/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase()
    }

    return (
        <Link
            to={`/${formatString(name)}`}
            className="flex flex-col items-center gap-2 drop-shadow-lg"
        >
            <img
                src={`/${formatString(name)}.png`}
                alt={''}
                className="rounded-lg"
                width={1920}
                height={1080}
            />
            <span>{name}</span>
        </Link>
    )
}

export default Project
