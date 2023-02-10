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

import { $openedModal, check, featureCartModel, modal, openModalById } from "./goods.model"
import { SkeletonCards } from "@/shared/ui/Skeleton/card-skeleton"
import { Fragment } from "react"
import { Modal } from "./ui/modal"




export const GoodsList = ({goods}:{goods:Good[]}) => {
	const cart = useStore(cartModel.$cart)
	const openedModal = useStore($openedModal)
	return (
		<div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(205px,max-content))] justify-center gap-10 mb-10">
				{!goods.length
				? <SkeletonCards length={14}/>
				: goods?.map((product) => {
					const {id, price,title,type,url, description} = product
					const addToCart = () => featureCartModel.startAddingToCart({id, price, title,type,url,description})
					const removeFromCart = () => featureCartModel.itemRemoveTriggered({deleteId: id})
					const isInBasket = isItemInCart(cart, id)
					return (
						<Fragment key={id}>
							<GoodCard price={price} title={title} type={type} url={url} id={id}
							isAdded={isItemInCart(cart, id)}
							openModal={openModalById}
							toggle={isInBasket? removeFromCart : addToCart}/>
							{openedModal == id &&
							<Modal modal={modal}
							product={product}
							isAdded={isItemInCart(cart, id)}
							toggle={isInBasket? removeFromCart : addToCart}/>}
						</Fragment>
					)
				})}
			</div>
		</div>
	)
}
{/* <Model model={$$model} like={likeToggle} description={item.description} image={item.image} ... other props/> */}