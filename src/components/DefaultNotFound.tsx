import { useRouter, Link } from '@tanstack/react-router'

function DefaultNotFound() {
    const router = useRouter()

    const faces = [
        '¯\\_(ツ)_/¯',
        '(╯°□°）╯︵ ┻━┻',
        'ᕙ(⇀‸↼‶)ᕗ',
        '(╥﹏╥)',
        '(っ◕‿◕)っ',
        '(ﾉ◕ヮ◕)ﾉ*･ﾟ✧',
        'ლ(`Д’ლ)',
        'ᕕ(⌐■_■)ᕗ ♪♬',
        '( ͡° ͜ʖ ͡°)',
        'ಠ_ಠ',
        'ᕕ( ᐛ )ᕗ',
        '(Ͼ˳Ͽ)',
        '(￣(ｴ)￣)',
    ] as const

    function getRandomElement(array: readonly string[]) {
        const randomIndex = Math.floor(Math.random() * array.length)

        return array[randomIndex]
    }

    function goBack() {
        return router.history.back()
    }

    return (
        <main className="flex flex-col items-center gap-8 pb-16 pt-11 md:gap-11 md:py-16 md:pb-32 md:pt-24 lg:gap-14 lg:pb-36">
            <div className="flex w-[87.5lvw] flex-col items-center gap-8 md:gap-11 lg:gap-14">
                <pre className="text-3xl md:text-4xl lg:text-5xl">
                    {getRandomElement(faces)}
                </pre>

                <h1 className="text-center text-3xl font-semibold md:text-4xl lg:text-5xl">
                    page not found
                </h1>
            </div>

            <div className="flex gap-2.5 text-sm md:text-base">
                <Link
                    to="/"
                    className="flex items-center rounded-full bg-black px-4 py-2 text-center text-white hover:bg-black/80 md:px-5 md:py-2.5"
                >
                    go home
                </Link>

                <button
                    onClick={goBack}
                    className="flex items-center rounded-full border border-black/80 px-4 py-2 text-center text-black/80 hover:bg-black/80 hover:text-white md:px-5 md:py-2.5"
                >
                    go back
                </button>
            </div>
        </main>
    )
}

export default DefaultNotFound
