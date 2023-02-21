import ContentLoader from "react-content-loader"

export const InfoBlockSkeleton = () => (
	<ContentLoader 
	speed={2}
	width={180}
	height={55}
	viewBox="0 0 180 55"
	backgroundColor="#f3f3f3"
	foregroundColor="#ecebeb"
	>
	<rect x="0" y="0" rx="0" ry="0" width="100" height="20" /> 
	<rect x="0" y="33" rx="0" ry="0" width="180" height="22" />
	</ContentLoader>
)