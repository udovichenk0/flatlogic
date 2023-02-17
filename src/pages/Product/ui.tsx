import { cartModel } from "@/entities/cart"
import { FeedbackCard } from "@/entities/feedback"
import { FeedbackForm } from "@/features/feedback"
import { isItemInCart } from "@/shared/lib/isItemInCart"
import { BrownAnimatedButton } from "@/shared/ui/Buttons/brown-animated-button"
import { Modal } from "@/shared/ui/modal"
import { useStore } from "effector-react"
import { $$feedback, $$modal, $$product, featureCartModel } from "./model"

const Product = () => {
	const product = useStore($$product.$product)
	const cart = useStore(cartModel.$cart)
	const feedbacks = useStore($$feedback.$reviews)
	const isFeedbackPending = useStore($$feedback.$isPending)
	return (
		<div>
			<div className="container">
				<div className="flex py-10 border-b-2 border-[#d9d9d9] mb-10">
					<div className="w-[500px] h-[500px]">
						<img className="w-full h-full" src={product.url} alt="" />
					</div>
					<div className="text-base-dark px-[21px] w-[50%] flex flex-col justify-between">
						<div className=" h-full flex flex-col gap-9">
							<div className="text-gray text-sm">{product.type}</div>
							<h3 className="text-[21px] font-bold">{product.title}</h3>
							<p className="text-gray text-sm">{product.description}</p>
							<div>
								<div className="flex flex-col gap-2">
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
					{!isFeedbackPending || feedbacks.length ? feedbacks.map((feedback, id) => {
						return (
							<div key={id}>
								<FeedbackCard feedback={feedback}/>
							</div>
						)
					})
				: <div className="flex items-center justify-center">
					<h2 className="font-bold text-xl text-base-dark">No one left a feedback</h2>
				</div>}
				{isFeedbackPending && <div className="bg-base-dark w-[500px] h-[500px]">Loading...</div>}
				</div>
			</div>
		</div>
	)
}
export default Product