import { useRouter } from '@tanstack/react-router'

function DefaultNotFound() {
    const router = useRouter()

    function goBack() {
        return router.history.back()
    }

    return (
        <div className="flex h-auto w-full flex-col gap-1 p-8 lg:gap-8 lg:p-16">
            <span>umm...</span>
            <span>what are you doing here?</span>
            <button onClick={goBack} className="w-fit">
                go back
            </button>
        </div>
    )
}

export default DefaultNotFound
