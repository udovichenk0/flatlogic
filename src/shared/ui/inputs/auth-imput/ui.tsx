import { SyntheticEvent } from "react"

export const AuthInput = (
	{
	name,
	placeholder,
	value,
	onChange,
	disable
}:{
	name: string,
	placeholder: string,
	value: string,
	onChange: (value: string) => void,
	disable: boolean
}) => {
	return (
		<div className="flex flex-col gap-2">
			<label className="font-bold text-base-dark" htmlFor={name}>{name}</label>
			<input className="outline-none py-[9px] text-sm px-6 border-2 border-[#d3d3d3]"
			name={name}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			disabled={disable}
			placeholder={placeholder}
			type="text" />
		</div>
	)
}