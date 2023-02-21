import ContentLoader from "react-content-loader";

export const PriceSkeleton = () => (
	<ContentLoader
	speed={2}
	width={50}
	height={50}
	viewBox="0 0 50 50"
	backgroundColor="#f3f3f3"
	foregroundColor="#ecebeb"
	>
	<rect x="0" y="18.5" rx="0" ry="0" width="50" height="18" />
	</ContentLoader>
)