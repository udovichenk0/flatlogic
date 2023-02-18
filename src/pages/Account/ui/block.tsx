export const Block = ({title, percent, linkLabel}:{title: string, percent: number, linkLabel: string}) => {
	return (
		<div className="font-bold px-7 pt-9 pb-12 bg-[#f5f5f5] max-w-[400px] flex-1">
			<h2 className="text-gray text-2xl">{title}</h2>
			<h2 className="text-brown text-[35px] mb-4">{percent}%</h2>
			<span className="text-base-dark text-sm">{linkLabel}</span>
		</div>
	)
}