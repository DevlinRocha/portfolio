import { useRouter } from '@tanstack/react-router'

function DefaultNotFound() {
    const router = useRouter()

    function goBack() {
        return router.history.back()
    }

    return (
        <div className="flex h-full w-full flex-col p-16">
            <span>umm...</span>
            <span>what are you doing here?</span>
            <button onClick={goBack} className="w-fit">
                go back
            </button>
        </div>
    )
}

export default DefaultNotFound
