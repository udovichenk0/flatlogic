export const BrownButton = ({text, action}:{text: string, action: () => void}) => {
	return (
		<button onClick={action}
		className='px-[42px] py-[14px] bg-brown hover:bg-[#af6c47] transition-colors duration-200 font-bold text-sm text-white'>
			{text}
		</button>
	)
}