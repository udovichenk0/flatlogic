export const Pagination = ({current, total, actionPrev, actionNext}:
	{
		current:number,
		total: number,
		actionPrev: () => void,
		actionNext:() => void
	}) => {
	return (
		<div className="flex items-center pb-10">
			<button className="border-2 border-base-dark p-2 rotate-180" onClick={actionPrev}>
				<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="#262626" opacity={0.8} viewBox="0 0 24 24">
					<polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/>
				</svg>
			</button>
			<div className="font-bold text-lg text-base-dark px-2">
				<span>1</span>
				<span>/</span>
				<span>{total}</span>
			</div>
			<button className="border-2 border-base-dark p-2" onClick={actionNext}>
				<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="#262626" opacity={0.8} viewBox="0 0 24 24">
					<polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/>
				</svg>
			</button>
		</div>
	)
}