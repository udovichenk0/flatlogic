import { FilledLikeSvg } from "./assets/filledLike"
import { LikeSvg } from "./assets/like"

export const Like = ({action, isAdded}: {action: () => void, isAdded: boolean}) => {
	return (
		<button onClick={action} className="hover:fill-brown w-[20px] h-[20px]">
			{
			isAdded
			? <FilledLikeSvg/>
			: <LikeSvg/>
		}
		</button>
	)
}