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
                src={`/${formatString(name)}-banner.svg`}
                alt={`${name} banner image`}
                width={1920}
                height={720}
                className="hover:scale-101 rounded-lg transition-transform duration-300"
            />
        </Link>
    )
}

export default Project
