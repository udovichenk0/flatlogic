export const SliderArrow = ({left, onClick}: {left?:boolean, onClick: () => void}) => {
	return (
		<button onClick={onClick} className={`${left && 'rotate-180'}`}>
			<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="64px" fill="#fff" opacity={0.8} viewBox="0 0 24 24">
				<polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/>
			</svg>
		</button>
	)
}