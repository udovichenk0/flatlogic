import { useStore } from "effector-react"

import { averageRate } from "@/shared/lib/average-rate"
import { isItemInCart } from "@/shared/lib/isItemInCart"
import { BrownAnimatedButton } from "@/shared/ui/Buttons/brown-animated-button"
import { Stars } from "@/shared/ui/Buttons/star"
import { Modal } from "@/shared/ui/modal"

import { cartModel } from "@/entities/cart"
import { FeedbackCard } from "@/entities/feedback"

import { FeedbackForm } from "@/features/feedback"

import { $$feedback, $$modal, $$product, featureCartModel } from "./model"

const Product = () => {
	const product = useStore($$product.$product)
	const cart = useStore(cartModel.$cart)
	const rates = useStore($$feedback.$rates)
	const feedbacks = useStore($$feedback.$reviews)
	const isFeedbackPending = useStore($$feedback.$isPending)
	return (
		<div>
			<div className="container">
				<div className="md:flex items-center py-10 border-b-2 border-[#d9d9d9] mb-10">
					<div className="w-[300px] max-md:mb-5 md:w-[475px]">
						<img className="w-full h-auto" src={product.url} alt="" />
					</div>
					<div className="text-base-dark px-[21px] md:w-[50%] flex flex-col justify-between">
						<div className=" h-full flex flex-col gap-9">
							<div className="text-gray text-sm">{product.type}</div>
							<h3 className="text-[21px] font-bold">{product.title}</h3>
							<Stars starRate={averageRate(rates)}/>
							<p className="text-gray text-sm">{product.description}</p>
							<div>
								<div className="flex md:flex-col mb-3 gap-2">
									<span className="text-gray font-bold">PRICE</span>
									<span className="text-base-dark font-bold">{product.price}$</span>
								</div>
							</div>
						</div>
						<div className="flex gap-2 items">
							<BrownAnimatedButton text={isItemInCart(cart, product.id)? 'REMOVE FROM CART' : 'ADD TO CART'} animation="hover" onClick={() => featureCartModel.favoriteToggled(product)}/>
						</div>
					</div>
				</div>
				<div className="flex justify-between mb-10">
					<h2 className="text-[21px] font-bold text-base-dark">Reviews: {product?.reviews?.length}</h2>
					<button onClick={() => $$modal.open()} className='text-bold text-sm text-brown'>+ Leave Feedback</button>
					<Modal modal={$$modal}>
						<FeedbackForm product={product}/>
					</Modal>
				</div>
				<div className="mb-14 flex flex-col gap-8">
					{!isFeedbackPending || feedbacks.length !=0 ? feedbacks.map((feedback, id) => {
						return (
							<div key={id}>
								<FeedbackCard feedback={feedback}/>
							</div>
						)
					})
				: <div className="flex items-center justify-center">
					<h2 className="font-bold text-xl text-base-dark">No one left a feedback</h2>
				</div>}
				{isFeedbackPending && <div className="bg-base-dark">Loading...</div>}
				</div>
			</div>
		</div>
	)
}
export default Product