import { CartItem } from "@/shared/api/User";
import { Star } from "@/shared/ui/Buttons/star";
import { useStore } from "effector-react";
import { $starRate, rateChanged } from "./model";

export const FeedbackForm = ({product}:{product:CartItem}) => {
	const starRate = useStore($starRate)

	const starLength = new Array(5).fill(0)
	return (
		<div>
			<div className="flex gap-3 items-center border-b-2 pb-5 mb-5 border-[#d9d9d9]">
				<div className="w-[100px] h-[100px] bg-[#d9d9d9]">
					<img className="w-full h-full" src={product.url} alt="" />
				</div>
				<div className="flex flex-col gap-2 text-sm text-gray">
				<span>{product.type}</span>
					<span className="text-lg font-bold text-base-dark">{product.title}</span>
				</div>
			</div>
			<div className="flex gap-2 items-center">
				<h2 className="text-sm font-bold text-base-dark">Rate Product: </h2>
				{starLength.map((_, id) => {
					console.log(id, starRate)
					return (
						<div key={id}>
							<Star isActive={id < starRate} action={() => rateChanged(id + 1)}/>
						</div>
					)
				})}
			</div>
		</div>
	)
	
}