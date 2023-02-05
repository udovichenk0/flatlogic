import { BrownAnimatedButton } from "@/shared/ui/Buttons/brown-animated-button"

export const SliderHeroCard = ({type, title, description, backImage} :
	{
	type: string,
	title: string,
	description: string,
	backImage: any
}) => {
	return (
		<div style={{backgroundImage: `url(${backImage})`}} className={`container keen-slider__slide w-full h-auto object-cover bg-no-repeat bg-cover`}>
			<div className="h-full flex justify-center flex-col mx-10 container">
				<span className="font-bold text-brown text-sm mb-3">{type.toUpperCase()}</span>
				<h2 className="text-[28px]">{title}</h2>
				<h1 className="font-bold text-[35px]">{description.toUpperCase()}</h1>
				<span>
				<BrownAnimatedButton text="VIEW MORE" arrow={true} 	animation={'leftToRight'}/>
				</span>
			</div>
		</div>
	)
}