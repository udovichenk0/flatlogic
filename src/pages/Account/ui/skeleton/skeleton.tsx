import { ImageSkeleton } from "./image-skeleton"
import { InfoBlockSkeleton } from "./info-block-skeleton"
import { PriceSkeleton } from "./price-skeleton"

export const CartItemSkeleton = () => {
		return (
			<div className='grid grid-cols-[1fr,165px,100px] items-center'>
			<div className="flex items-center gap-5">
				<ImageSkeleton/>
				<InfoBlockSkeleton/>
			</div>
				<PriceSkeleton/>
				<PriceSkeleton/>
			</div>
		)
}