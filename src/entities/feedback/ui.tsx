import { Feedback } from "@/shared/api/Products"
import { Stars } from "@/shared/ui/Buttons/star"

import UserImage from '/user.png'

export const FeedbackCard = ({feedback}: {feedback: Feedback}) => {
	return (
		<div className="flex gap-10">
			<div className="w-[132px] h-[132px]">
				<img className="w-full h-auto" src={feedback?.avatar_url || UserImage} alt={feedback?.fullname} />
			</div>
			<div className="flex flex-col justify-between">
				<h2 className="text-base-dark text-sm font-bold">{feedback?.fullname}</h2>
				<Stars starRate={feedback?.rate}/>
				<p className="text-base-dark text-sm leading-3">{feedback?.comment}</p>
			</div>
		</div>
	)
}