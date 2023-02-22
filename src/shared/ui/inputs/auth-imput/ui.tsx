import { SyntheticEvent } from "react"

export const AuthInput = (
	{
	name,
	placeholder,
	value,
	onChange,
	disable,
	errorText
}:{
	name: string,
	placeholder: string,
	value: string,
	onChange: (value: string) => void,
	disable: boolean,
	errorText: string
}) => {
	return (
		<div className="flex flex-col gap-2">
			{
			errorText
			? <span className="text-sm text-[#e09090]">{errorText}</span>
			: <label className="font-bold text-sm text-base-dark" htmlFor={name}>{name}</label>
			}
			<input className={`w-full outline-none py-[9px] text-sm px-6 border-2 border-[#d3d3d3] ${errorText && 'border-[#e09090]'}`}
			name={name}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			disabled={disable}
			placeholder={placeholder}
			type="text" />
		</div>
	)
}