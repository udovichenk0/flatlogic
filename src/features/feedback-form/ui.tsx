import { CartItem } from "@/shared/api/User";
import { BrownButton } from "@/shared/ui/Buttons/brown-button";
import { Star } from "@/shared/ui/Buttons/star";
import { useStore } from "effector-react";
import { $starRate, $textareaValue, feedbackSubmitted, rateChanged, textareaChanged } from "./model";

const starLength = new Array(5).fill(0)
export const FeedbackForm = ({product}:{product:CartItem}) => {
	const starRate = useStore($starRate)
	const textareaValue = useStore($textareaValue)
	return (
		<div>
			<div className="flex gap-3 items-center border-b-2 pb-5 mb-5 border-[#d9d9d9]">
				<div className="w-[100px] h-[100px] bg-[#d9d9d9]">
					<img className="w-full h-full" src={product.url} alt={product.title} />
				</div>
				<div className="flex flex-col gap-2 text-sm text-gray">
				<span>{product.type}</span>
					<span className="text-lg font-bold text-base-dark">{product.title}</span>
				</div>
			</div>
			<div className="flex gap-2 items-center mb-5">
				<h2 className="text-sm font-bold text-base-dark">Rate Product: </h2>
				{starLength.map((_, id) => {
					return (
						<div key={id}>
							<Star isActive={id < starRate} action={() => rateChanged(id + 1)}/>
						</div>
					)
				})}
			</div>
			<textarea value={textareaValue} onChange={(e) => textareaChanged(e.currentTarget.value)} placeholder="Add your comment" className="w-full border-2 border-[#ddd] p-4 h-[200px] outline-none" name="" id=""></textarea>
			<BrownButton text={"LEAVE FEEDBACK"} action={() => feedbackSubmitted(product.id)}/>
		</div>
	)
}