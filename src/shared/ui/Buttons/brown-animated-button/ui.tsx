import { useState } from "react"

export const BrownAnimatedButton = ({text, arrow, onClick, animation}:
	{
		text:string,
		arrow?:boolean,
		animation: 'leftToRight' | 'hover',
		onClick?: any,
	}) => {
		const [hover, hovered] = useState(false)

	return (
		<button onClick={onClick} onMouseEnter={() => hovered(true)} onMouseLeave={() => hovered(false)}
		className={`border-[1px] border-brown font-bold px-[42px] py-[14px] flex items-center gap-1 ${animation == 'leftToRight'? `hover:shadow-[inset_240px_0_0_0_#bd744c]` : `hover:bg-[#bd744c]`}  hover:text-[#fff] hover:fill-[#ffffff] fill-brown text-brown transition-all duration-300`}>
			<span>
				{text}
			</span>
			{arrow && <span className={`${hover && 'translate-x-3'} transition-transform duration-300`}>
				<svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24"><title>Artboard-1</title><g id="Right-4" data-name="Right"><path d="M18.707,12.707l-3,3a1,1,0,0,1-1.414-1.414L15.586,13H6a1,1,0,0,1,0-2h9.586L14.293,9.707a1,1,0,0,1,1.414-1.414l3,3A1,1,0,0,1,18.707,12.707Z"/></g></svg>
			</span>}
		</button>
	)
}