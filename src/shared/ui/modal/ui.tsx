import {Event, Store} from 'effector'
import { useStore } from "effector-react"
import { ReactNode, useEffect, useRef } from "react"

type Modal = {
	$isOpened: Store<boolean>,
	open: Event<void>,
	close: Event<void>,
	closeOnOverlayClick?: Event<{ ref: HTMLInputElement | null; target: EventTarget }>
}

export const Modal = ({children,modal}:{children: ReactNode, modal: Modal}) => {
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
		onClick={(e) => modal.closeOnOverlayClick? modal.closeOnOverlayClick({ref: overlayRef.current, target: e.target}) : {}}
		className="fixed left-0 top-0 w-full h-full flex items-center justify-center bg-opacity-40 z-10 bg-base-dark">
			<div className="bg-white w-[920px]">
				<div className="p-9">
					<div className="flex justify-end">
						<button onClick={() => modal.close()} className="">X</button>
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}