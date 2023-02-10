import { CartItem } from "@/shared/api/User";
import { Store, Event } from "effector"
import { useStore } from "effector-react"
import { useEffect, useRef } from "react";

type Modal = {
	$isOpened: Store<boolean>,
	open: Event<void>,
	close: Event<void>,
	closeOnOverlayClick?: Event<{ ref: HTMLInputElement | null; target: EventTarget }>
}


export const Modal = ({modal, product}:{modal:Modal, product:CartItem}) => {
	const overlayRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'visible'
		}
	})
	return (
		<div
		ref={overlayRef}
		onClick={(e) => modal.closeOnOverlayClick? modal.closeOnOverlayClick({ref: overlayRef.current, target: e.target}) : {}}
		className="fixed left-0 top-0 w-full h-full flex items-center justify-center bg-opacity-40 z-10 bg-base-dark">
			<div className="relative z-20">
				asdfasdfadsf
			</div>
		</div>
	)
	
}