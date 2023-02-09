import { Fragment } from "react"
import ContentLoader from "react-content-loader"

export const SkeletonCards = ({length}:{length: number}) => {
	const skeletonCardsNumber = new Array(length).fill(0)
	return (
		<>
		{skeletonCardsNumber.map((id) => {
			return (
				<Fragment key={id}>
					<ContentLoader 
					speed={2}
					width={230}
					height={337}
					viewBox="0 0 230 337"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
					>
					<rect x="0" y="0" rx="0" ry="0" width="228" height="228" /> 
					<rect x="0" y="246" rx="0" ry="0" width="150" height="18" /> 
					<rect x="0" y="280" rx="0" ry="0" width="150" height="22" /> 
					<rect x="0" y="313" rx="0" ry="0" width="150" height="18" />
					</ContentLoader>
				</Fragment>
			)
		})}
		</>
	)
}
