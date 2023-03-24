import { CartItem } from "@/shared/api/User";

export const WishCard = ({product}:{product: CartItem}) => {
	return (
		<div className='grid grid-cols-[1fr,165px,100px] items-center'>
			<div className="flex items-center gap-5">
				<div className="min-w-[100px] w-[100px] h-[107px] bg-[#d3d3d3]">
					<img className="w-full h-full" src={product.url} alt="" />
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-gray text-sm">{product.type}</span>
					<span className="text-base-dark font-bold text-lg">{product.title}</span>
				</div>
			</div>
				
				<span className="font-bold text-base-dark text-sm">5$</span>

			<span className="text-sm font-bold text-base-dark">${product.price}</span>
		</div>
	)
}