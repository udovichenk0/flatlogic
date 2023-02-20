import { useKeenSlider } from "keen-slider/react"
import { PropsWithChildren } from "react"

import { SliderArrow } from "@/shared/ui/Buttons/Arrow"
export const SliderBlock = ({children}:PropsWithChildren) => {
	const [sliderRef, instanceRef] = useKeenSlider(
		{
		loop: true
		},
		[
		(slider) => {
			let timeout: ReturnType<typeof setTimeout>
			let mouseOver = false
			function clearNextTimeout() {
				clearTimeout(timeout)
			}
			function nextTimeout() {
				clearTimeout(timeout)
				if (mouseOver) return
				timeout = setTimeout(() => {
				slider.next()
			}, 2000)
			}
			slider.on("created", () => {
				slider.container.addEventListener("mouseover", () => {
					mouseOver = true
					clearNextTimeout()
				})
				slider.container.addEventListener("mouseout", () => {
					mouseOver = false
					nextTimeout()
				})
				nextTimeout()
				})
				slider.on("dragStarted", clearNextTimeout)
				slider.on("animationEnded", nextTimeout)
				slider.on("updated", nextTimeout)
			},
		]
	)
	return (
		<div className='navigation-wrapper flex items-center w-full h-[530px] relative mb-20'>
			<span className="absolute z-10">
				<SliderArrow onClick={() => instanceRef.current?.prev()} left/>
			</span>
				<div ref={sliderRef} className="keen-slider h-full">
					{children}
				</div>
			<span className="absolute z-10 right-0">
				<SliderArrow onClick={() => instanceRef.current?.next()}/>
			</span>
		</div>
	)
}