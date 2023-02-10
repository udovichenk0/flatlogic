import { Store, Event } from "effector"
import { useStore } from "effector-react"
import { useRef } from "react";

type Modal = {
	$isOpened: Store<boolean>,
	open: Event<void>,
	close: Event<void>,
	closeOnOverlayClick?: Event<{ ref: HTMLInputElement | null; target: EventTarget }>
}


export const Modal = ({modal}:{modal:Modal}) => {
	const isOpened = useStore(modal.$isOpened)
	const overlayRef = useRef<HTMLInputElement>(null)
	if(!isOpened) return null


	return (
		<div
		ref={overlayRef}
		onClick={(e) => modal.closeOnOverlayClick? modal.closeOnOverlayClick({ref: overlayRef.current, target: e.target}) : {}}
		className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-opacity-40 z-10 bg-base-dark">
			<div className="relative z-20">
				asdfasdfadsf
			</div>
		</div>
	)
	
}