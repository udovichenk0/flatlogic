import { Like } from '@/shared/ui/Buttons/like'
import { useEffect, useState } from 'react'
export const GoodCard = ({type,url,price,title, addToCard, isAdded, removeFromCart}:
	{
	type: string,
	url: string,
	price: number,
	title: string,
	isAdded: boolean,
	addToCard: () => void,
	removeFromCart: () => void
}) => {
	const [hovered, hover] = useState<boolean>(false)
	return (
		<div onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)} className="w-full max-w-[245px] flex flex-col">
			<div className='flex relative items-center'>
			<button className={`mb-5 ${hovered && 'scale-[1.04]'} w-[245px] h-[245px] transition-transform duration-200`}>
				<img className='w-full h-auto' src={url} alt={type} />
			</button>
				<div className='absolute right-4'>
					<Like action={isAdded? removeFromCart : addToCard} isAdded={isAdded}/>
				</div>
			</div>
			<button className='flex flex-col gap-2 mb-2'>
				<span className='text-gray text-sm'>{type}</span>
				<span className={`text-[#232323] font-bold transition-colors duration-200 ${hovered && 'text-brown'}`}>{title}</span>
			</button>
			<span className='text-base-dark'>${price}</span>
		</div>
	)
}