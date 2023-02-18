import { useStore } from "effector-react"

import { $cart } from "@/entities/cart/model"

import { Block } from "./ui/block"
import { WishCard } from "@/entities/cart"
import { Fragment } from "react"

const Account = () => {
	const cart = useStore($cart)
	return (
		<div className="container">
			<div className="mb-10">
				<h1 className="font-bold text-base-dark text-2xl pt-3">My Account</h1>
				<div className="flex gap-5">
					<Block title={'sale up to'} percent={30} linkLabel={'Read More'} />
					<Block title={'sale up to'} percent={30} linkLabel={'Read More'} />
				</div>
				<h1 className="font-bold text-base-dark text-2xl pt-3">My Wishlist</h1>
				<div className="grid grid-cols-[1fr,165px,100px] text-sm text-[#3c484f] font-semibold py-4 mb-4 border-b-2 border-[#D9D9D9]">
					<span>PRODUCT</span>
					<span>DELIVERY</span>
					<span className="flex">PRICE</span>
				</div>
				<div className="flex flex-col gap-5 border-b-2 border-[#d3d3d3] pb-5">
					{cart.map((cartItem) => {
						return (
							<Fragment key={cartItem.id} >
								<WishCard product={cartItem}/>
							</Fragment>
						)
					})}
				</div>
				</div>
		</div>
	)
}

export default Account