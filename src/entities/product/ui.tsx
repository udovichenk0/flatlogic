import { Link } from 'atomic-router-react'
import {Event} from 'effector'
import { useState } from 'react'

import { goToProductRoute } from '@/shared/routing'
import { Like } from '@/shared/ui/Buttons/like'
import { SearchSvgButton } from '@/shared/ui/Buttons/search-svg-button'

export const GoodCard = ({type,url,price,title, isAdded, openModal, id, toggle}:
	{
	type: string,
	url: string,
	price: number,
	title: string,
	isAdded: boolean,
	id: string,
	toggle: () => void
	openModal: Event<string>
}) => {
	const [hovered, hover] = useState<boolean>(false)
	return (
		<div onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)} className="w-full max-w-[245px] flex flex-col">
			<div className='flex relative items-center'>
				<Link to={goToProductRoute} params={{id}} className={`mb-6 ${hovered && 'scale-[1.04]'} w-[245px] h-[245px] transition-transform duration-200`}>
					<img className='w-full h-auto' src={url} alt={type} />
				</Link>
					<div className={`absolute right-4 flex flex-col gap-4 fill-base-dark opacity-0 ${hovered && 'opacity-[100]'} transition-opacity duration-200`}>
						<Like action={toggle} isAdded={isAdded}/>
						<SearchSvgButton action={() => openModal(id)}/>
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