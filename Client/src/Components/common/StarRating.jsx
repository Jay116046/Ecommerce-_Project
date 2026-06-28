import { StarIcon } from "lucide-react"
import { Button } from "../ui/button"

function StarRatingComponent({ rating, handleRatingChange }) {

    return (
        <>
            {
                [1, 2, 3, 4, 5].map((star) => (
                    <Button
                        key={star}
                        className={`p-2 rounded-full transition-colors
                        ${star <= rating ? 'text-yellow-500 hover:bg-black' : 'text-black hover:bg-black hover:text-white'}`}
                        onClick={handleRatingChange ? () => handleRatingChange(star) : null}
                        variant="" size="icon">
                        <StarIcon
                            className={`w-6 h-6 ${star <= rating ? 'fill-yellow-500' : 'fill-black'}`}
                        />
                    </Button>
                ))
            }

        </>
    )
}

export default StarRatingComponent