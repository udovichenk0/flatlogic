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

import { $openedModal, featureCartModel, modal, openModalById } from "./goods.model"
import { SkeletonCards } from "@/shared/ui/Skeleton/card-skeleton"
import { Fragment } from "react"
import { Modal } from "./ui/modal"




export const GoodsList = ({goodsModel}:any) => {
	const cart = useStore(cartModel.$cart)
	const goods:Good[] = useStore(goodsModel.$goods)
	const isFetching = useStore(goodsModel.$isFetching)
	const openedModal = useStore($openedModal)
	return (
		<div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(205px,max-content))] justify-center gap-10 mb-16">
				{isFetching
				? <SkeletonCards length={8}/>
				: goods?.map((product) => {
					const {id, price,title,type,url} = product
					return (
						<Fragment key={id}>
							<GoodCard price={price} title={title} type={type} url={url} id={id}
							isAdded={isItemInCart(cart, id)}
							openModal={openModalById}
							toggle={() => featureCartModel.favoriteToggled(product)}/>
							{openedModal == id &&
							<Modal modal={modal}
							product={product}
							isAdded={isItemInCart(cart, id)}
							toggle={() => featureCartModel.favoriteToggled(product)}/>}
						</Fragment>
					)
				})}
			</div>
		</div>
	)
}
{/* <Model model={$$model} like={likeToggle} description={item.description} image={item.image} ... other props/> */}