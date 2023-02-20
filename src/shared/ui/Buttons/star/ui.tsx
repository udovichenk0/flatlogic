import { Event } from "effector"

const starLength = new Array(5).fill(0)
export const Stars = ({starRate, action}:{starRate:number, action?:Event<number>}) => {
	return (
		<div className="flex">
			{starLength.map((_, id) => {
			return (
				<div key={id}>
					<button onClick={() => action? action(id+1) : null} className={`${id < starRate? 'fill-brown' :'fill-[#ddd]'}`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
					</button>
				</div>
			)
		})}
		</div>
	)
}