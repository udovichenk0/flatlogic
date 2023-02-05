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
import { $$goodsList } from "@/pages/Home"
import { Good } from "@/shared/api/Goods"
import { Effect, Store } from "effector"
import { useStore } from "effector-react"


export const GoodsList = ({goodsList}: {
	goodsList: {
		$goods:Store<Good[]>,
		getGoodsFx: Effect<void, any>
	}
}) => {
	const goods = useStore(goodsList.$goods)
	console.log(goods)
	return (
		<div>
			
			{goods?.map((item) => {
				return (
					<div key={item.id}>
						<GoodCard image={item.url} price={item.price} type={item.type} title={item.title} id={item.id}/>
					</div>
				)
			})}
		
		</div>
	)
}
{/* <Model model={$$model} like={likeToggle} description={item.description} image={item.image} ... other props/> */}