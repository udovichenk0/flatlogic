import { useStore } from "effector-react"
import { Fragment } from "react"

import { WishCard } from "@/entities/cart"
import { $cart } from "@/entities/cart/model"
import { $session } from "@/entities/session/model"

import { Block } from "./ui/block"
import { Profile } from "./ui/profile"
import { CartItemSkeleton } from "./ui/skeleton"

const Account = () => {
	const cart = useStore($cart)
	const session = useStore($session)
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
						{cart.length ?
						cart.map((cartItem) => {
							return (
								<Fragment key={cartItem.id} >
									<WishCard product={cartItem}/>
								</Fragment>
							)
						})
						: skeletonLength.map((_, id) => {
							return (
								<Fragment key={id}>
									<CartItemSkeleton/>
								</Fragment>
							)
						})
					}
					</div>
				</div>
				<Profile session={session}/>
			</div>
		</div>
	)
}

export default Account