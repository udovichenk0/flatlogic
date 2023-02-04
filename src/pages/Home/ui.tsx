import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { SliderHeroCard } from '@/entities/Cards/SliderCard'
import { SliderBlock } from '@/widgets/SliderBlock'

import firstCard from '/first.webp'
import secondCard from '/second.webp'
import thirdCard from '/third.webp'
const Home = () => {
	const [sliderRef, instanceRef] = useKeenSlider(
		{
		  slideChanged() {
			console.log('slide changed')
		  },
		},
		[
		  // add plugins here
		]
	  )
	return (
		<div>
			<SliderBlock>
				<SliderHeroCard type='CHAIR' title='get all' description='the good stuff' backImage={firstCard}/>
				<SliderHeroCard type='123' title='get all' description='the good stuff' backImage={secondCard}/>
				<SliderHeroCard type='sdfsadf' title='get all' description='the good stuff' backImage={thirdCard}/>
			</SliderBlock>
		</div>
	)
}



export default Home