import ContentLoader from "react-content-loader";

export const ImageSkeleton = () => (
	<ContentLoader
	speed={2}
	width={100}
	height={107}
	viewBox="0 0 100 107"
	backgroundColor="#f3f3f3"
	foregroundColor="#ecebeb"
	>
	<rect x="0" y="0" rx="0" ry="0" width="100" height="107" />
	</ContentLoader>
)