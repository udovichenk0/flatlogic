import {modelView} from "effector-factorio";
import { useUnit } from "effector-react";

import { BrownButton } from "@/shared/ui/Buttons/brown-button";
import { Stars } from "@/shared/ui/Buttons/star";

import { CartProduct } from "@/entities/cart";

import { feedbackFactory } from "@/features/feedback/feedback.model";

export const FeedbackForm = modelView(feedbackFactory,({product, isCommented}: {product:CartProduct, isCommented: boolean}) => {
	const model = feedbackFactory.useModel()
	const [userRate, userComment] = useUnit([model.$starRate, model.$textareaValue])
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
				<Stars starRate={userRate} action={model.rateChanged}/>
			</div>
			<textarea value={userComment} onChange={(e) => model.textareaChanged(e.currentTarget.value)} placeholder="Add your comment"
			className="w-full border-2 border-[#ddd] p-4 h-[200px] outline-none mb-5" name="" id=""></textarea>
			<BrownButton text={"LEAVE FEEDBACK"} action={() => model.feedbackSubmitted({id: product.id, isCommented })}/>
		</div>
	)
})