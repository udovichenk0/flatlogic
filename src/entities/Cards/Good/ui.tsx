import { Good } from '@/shared/api/Goods'
import { Like } from '@/shared/ui/Buttons/like'
import { Event } from 'effector'
import { useState } from 'react'
//image={item.url} price={item.price} type={item.type} title={item.title} id={item.id}
export const GoodCard = ({type,url,price,title, addToCard}:
	{
	type: string,
	url: string,
	price: number,
	title: string,
	addToCard: any
}) => {
	const [hovered, hover] = useState<boolean>(false)
	return (
		<div onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)} className="w-full max-w-[245px] flex flex-col">
			<div className='flex relative items-center'>
			<button className={`mb-5 ${hovered && 'scale-[1.04]'} transition-transform duration-200`}>
				<img src={url} alt={type} />
			</button>
				<div className='absolute right-4'>
					<Like action={addToCard}/>
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