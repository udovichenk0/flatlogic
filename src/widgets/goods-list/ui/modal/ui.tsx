import { Store, Event } from "effector"
import {useStore} from "effector-react";
import { useEffect, useRef } from "react";

import { BrownAnimatedButton } from "@/shared/ui/Buttons/brown-animated-button";

import { CartProduct } from "@/entities/cart";

type Modal = {
	$isOpened: Store<boolean>,
	open: Event<void>,
	close: Event<void>,
	closeOnOverlayClickTriggered?: Event<{ ref: HTMLInputElement | null; target: EventTarget }>
}


export const Modal = ({modal, product, toggle, isAdded}:{modal:Modal, product: CartProduct, toggle: () => void, isAdded: boolean}) => {
	const isOpened = useStore(modal.$isOpened)

	const overlayRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if(isOpened){
			document.body.style.overflow = 'hidden'
		}
		return () => {
			document.body.style.overflow = 'visible'
		}
	})
	if(!isOpened) return null
	return (
		<div
		ref={overlayRef}
		onClick={(e) => modal.closeOnOverlayClickTriggered? modal.closeOnOverlayClickTriggered({ref: overlayRef.current, target: e.target}) : {}}
		className="fixed left-0 top-0 w-full h-full flex items-center justify-center bg-opacity-40 z-10 bg-base-dark">
			<div className="relative z-20 h-[485px] max-w-[900px] flex flex-1 bg-[#fff]">
				<div className="w-[485px] h-[485px]">
					<img className="w-full h-full" src={product.url} alt="" />
				</div>
				<div className="text-base-dark p-[21px] w-[50%] flex flex-col justify-between">
				<div className="">
					<div className="text-brown text-sm font-bold mb-5">More about product</div>
					<div className="text-gray text-sm mb-4">{product.type}</div>
					<h3 className="text-[21px] mb-4">{product.title}</h3>
					<p className="text-gray text-sm mb-4">{product.description}</p>
					<div>
						<div className="flex flex-col gap-2 mb-4">
							<span className="text-gray font-bold">PRICE</span>
							<span className="text-base-dark font-bold">{product.price}$</span>
						</div>
					</div>
				</div>
				<div className="flex gap-2">
					<BrownAnimatedButton text={isAdded? 'REMOVE FROM CART' : 'ADD TO CART'} animation="hover" onClick={toggle}/>
				</div>
				</div>
			</div>
		</div>
	)
	
}