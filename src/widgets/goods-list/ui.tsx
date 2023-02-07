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

import { GoodCard } from "@/entities/Cards/Good"
import { cartModel } from "@/entities/cart"
import { startAddingToCart } from "@/features/save/save-to-cart"
import { $$goodsList } from "@/pages/Home"
import { Good } from "@/shared/api/Goods"
import { BrownAnimatedButton } from "@/shared/ui/Buttons/brown-animated-button"
import { Effect, Store } from "effector"
import { useStore } from "effector-react"


export const GoodsList = ({goodsList}: {
	goodsList: {
		$goods:Store<Good[]>,
		getGoodsFx: Effect<any, any>
	}
}) => {
	const goods = useStore(goodsList.$goods)
	const cart = useStore(cartModel.$cart)
	return (
		<div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(205px,max-content))] justify-center gap-10 mb-10">
				{goods?.map(({id, price,title,type,url, description}) => {
					return (
						<div key={id} className='w-full'>
							<GoodCard price={price} title={title} type={type} url={url}
							addToCard={() => startAddingToCart({id, price, title,type,url,description})}/>
						</div>
					)
				})}
			</div>
		</div>
	)
}
{/* <Model model={$$model} like={likeToggle} description={item.description} image={item.image} ... other props/> */}