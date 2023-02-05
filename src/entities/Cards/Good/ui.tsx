import Good from './goods.png'
//image={item.url} price={item.price} type={item.type} title={item.title} id={item.id}
export const GoodCard = ({image, price, type,title,id}: {
	image: string,
	price:number,
	type: string,
	title: string,
	id: string
}) => {
	return (
		<div className="w-full max-w-[245px] flex flex-col">
			<button className='mb-5'>
				<img src={image} alt={type} />
			</button>
			<button className='flex flex-col gap-2 mb-2'>
				<span className='text-gray text-sm'>{type}</span>
				<span className='text-[#232323] font-bold'>{title}</span>
			</button>
			<span className='text-base-dark'>${price}</span>
		</div>
	)
}