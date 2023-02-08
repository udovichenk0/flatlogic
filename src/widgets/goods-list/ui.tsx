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

import { useStore } from "effector-react"

import { Good } from "@/shared/api/Goods"
import { isItemInCart } from "@/shared/lib/isItemInCart"

import { cartModel } from "@/entities/cart"
import { GoodCard } from "@/entities/Cards/Good"

import { removeItemTriggered, startAddingToCart } from "@/features/save/save-to-cart"



export const GoodsList = ({goods}:{goods:Good[]}) => {
	const cart = useStore(cartModel.$cart)
	return (
		<div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(205px,max-content))] justify-center gap-10 mb-10">
				{goods?.map(({id, price,title,type,url, description}) => {
					return (
						<div key={id} className='w-full'>
							<GoodCard price={price} title={title} type={type} url={url}
							isAdded={isItemInCart(cart, id)}
							addToCard={() => startAddingToCart({id, price, title,type,url,description})}
							removeFromCart={() => removeItemTriggered({cart, id})}/>
						</div>
					)
				})}
			</div>
		</div>
	)
}
{/* <Model model={$$model} like={likeToggle} description={item.description} image={item.image} ... other props/> */}