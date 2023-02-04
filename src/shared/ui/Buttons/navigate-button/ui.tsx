import { RouteInstance } from "atomic-router"
import { Link } from "atomic-router-react"
import { useState } from "react"
import { ArrowSvg } from "./arrow.svg"
export const NavigateButton = ({path, label, dropItems}:
	{
	path: RouteInstance<any>,
	label: string,
	dropItems?: {path: RouteInstance<any>, label:string}[]
}) => {
const [hovered, hover] = useState(false)
return (
	<div onMouseLeave={() => hover(false)} onMouseEnter={() => hover(true)} className='h-full relative z-10 text-[14px]'>
		<div className={`h-full gap-1 flex items-center ${hovered && 'text-[#bd744c] fill-[#bd744c]'} px-4 relative text-[#3c484f] transition-all duration-300 h-full before:content-[''] before:w-[14px] before:bg-[#bd744c] before:h-[1px] before:absolute before:top-[28px] before:left-[-19px] before:opacity-0 before:duration-300 ${hovered && 'before:opacity-100 before:left-[-5px]'}`}>
			<Link to={path} className={``}>
				{label}
			</Link>
			{dropItems && <span className="rotate-90">
				<ArrowSvg/>
			</span>}
		</div>
		<div className={`absolute pt-[1px] flex flex-col gap-5 z-0 ${hovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
			{dropItems && <div className="flex flex-col">
				{dropItems.map(({path,label}) => {
					return (
						<Link to={path} key={label} className='bg-white w-[180px] hover:text-[#bd744c] p-4'>
							{label}
						</Link>
					)
				})}
			</div>}
		</div>
	</div>
)
}