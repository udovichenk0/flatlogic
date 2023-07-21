import { useStore } from "effector-react"
import { Fragment } from "react"

import { WishCard, $cart } from "@/entities/cart"
import { $session, getUserFx } from "@/entities/session"

import { Block } from "./ui/block"
import { Profile } from "./ui/profile"
import { CartItemSkeleton } from "./ui/skeleton"

const Account = () => {
	const cart = useStore($cart)
	const session = useStore($session)
	const isPending = useStore(getUserFx.pending)
	const skeletonLength = new Array(6).fill(0)
	return (
		<div className="container">
			<div className="flex pt-8 pb-8 gap-10">
				<div className="flex-1">
					<h2 className="font-bold text-base-dark text-2xl pb-3">My Account</h2>
					<div className="flex gap-5 pb-3">
						<Block title={'sale up to'} percent={30} linkLabel={'Read More'} />
						<Block title={'sale up to'} percent={30} linkLabel={'Read More'} />
					</div>
					<h1 className="font-bold text-base-dark text-2xl">My Wishlist</h1>
					<div className="grid grid-cols-[1fr,165px,100px] text-sm text-[#3c484f] font-semibold py-4 mb-4 border-b-2 border-[#D9D9D9]">
						<span>PRODUCT</span>
						<span>DELIVERY</span>
						<span className="flex">PRICE</span>
					</div>
					<div className="flex flex-col gap-5 border-b-2 border-[#d3d3d3] pb-5">
						{isPending
							? skeletonLength.map((_, id) => {
								return (
									<Fragment key={id}>
										<CartItemSkeleton/>
									</Fragment>
								)
							})
						: cart.map((cartItem) => {
							return (
								<Fragment key={cartItem.id} >
									<WishCard product={cartItem}/>
								</Fragment>
							)
						})
					}
					{
					!isPending && !cart.length &&
					<h2 className="font-base-dark font-bold text-xl flex items-center justify-center">Your cart is empty</h2>
					}
					</div>
				</div>
				<Profile session={session}/>
			</div>
		</div>
	)
}

export default Account