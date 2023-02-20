import { Store } from "effector"
import { useStore } from "effector-react"
import { Fragment } from "react"

import { Product } from "@/shared/api/Products"
import { isItemInCart } from "@/shared/lib/isItemInCart"
import { SkeletonCards } from "@/shared/ui/Skeleton/card-skeleton"

import { $$cartModel } from "@/entities/cart"
import { GoodCard } from "@/entities/product"


import { $openedModal, featureCartModel, modal, openModalById } from "./goods.model"
import { Modal } from "./ui/modal/ui"


type GoodModel <T> ={
	$goods: Store<T>,
	$isFetching: Store<boolean>,
}

export const GoodsList = ({goodsModel}:{goodsModel: GoodModel<Product[]>}) => {
	const cart = useStore($$cartModel.$cart)
	const goods = useStore(goodsModel.$goods)
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
			{
			!isFetching && goods.length == 0 &&
			<div className="flex items-center justify-center">
				<h2 className="font-bold text-[30px] text-base-dark">There is no such products :(</h2>
			</div>
			}
		</div>
	)
}