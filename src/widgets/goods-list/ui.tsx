/*export const createModel = () => {
	const open = createEvent()
	const close = createEvent()
	const $store = createStore(false)
	const $data = createStore<Data>()
	.on(open, state => true)
	.on(close, state => false)
	return {store, open, close}
}


$$model.store.on({
	clock: open,

})
*/

/*
export const notification = ({
	store,
	modelTriggered,
	mode,
	message}:{
		store: Store<any>,
		modelTriggered: Event<any>,
		mode: 'success' | 'info' | 'error",
		message: string
	}) => {
		
}
*/


import { useStore } from "effector-react"

import { Good } from "@/shared/api/Goods"
import { isItemInCart } from "@/shared/lib/isItemInCart"

import { cartModel } from "@/entities/cart"
import { GoodCard } from "@/entities/Cards/Good"

import { featureCartModel } from "./goods.model"
import { SkeletonCards } from "@/shared/ui/Skeleton/card-skeleton"
import { Fragment } from "react"




export const GoodsList = ({goods}:{goods:Good[]}) => {
	const cart = useStore(cartModel.$cart)
	return (
		<div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(205px,max-content))] justify-center gap-10 mb-10">
				{!goods.length
				? <SkeletonCards length={14}/>
				: goods?.map(({id, price,title,type,url, description}) => {
					return (
						<Fragment key={id}>
							<GoodCard price={price} title={title} type={type} url={url}
							isAdded={isItemInCart(cart, id)}
							addToCard={() => featureCartModel.startAddingToCart({id, price, title,type,url,description})}
							removeFromCart={() => featureCartModel.itemRemoveTriggered({deleteId: id})}/>
						</Fragment>
					)
				})}
			</div>
		</div>
	)
}
{/* <Model model={$$model} like={likeToggle} description={item.description} image={item.image} ... other props/> */}