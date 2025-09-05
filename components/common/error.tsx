export default function ErrorCard({ reset }: { reset: () => void }) {
    return (
        <section className="flex flex-col justify-center items-center min-h-auto">
            <h4>Something went wrong!</h4>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </section>
    )
}