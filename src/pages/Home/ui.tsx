import 'keen-slider/keen-slider.min.css'
import { SliderHeroCard } from '@/entities/Cards/SliderCard'
import { SliderBlock } from '@/widgets/SliderBlock'

import firstCard from '/first.webp'
import secondCard from '/second.webp'
import thirdCard from '/third.webp'
import { $$goodsList, homeRoutes, redirectToShop } from './home.module'
import { GoodsList } from '@/widgets/goods-list'
import { BrownAnimatedButton } from '@/shared/ui/Buttons/brown-animated-button'


const Home = () => {
	return (
		<div>
			<SliderBlock>
				<SliderHeroCard type='CHAIR' title='get all' description='the good stuff' backImage={firstCard}/>
				<SliderHeroCard type='CHAIR' title='get all' description='the good stuff' backImage={secondCard}/>
				<SliderHeroCard type='CHAIR' title='get all' description='the good stuff' backImage={thirdCard}/>
			</SliderBlock>
			<div className='container flex flex-col items-center'>
				<h2 className='text-base-dark text-[24px] font-bold mb-6'>New Arrivals</h2>
				<p className='max-w-[600px] text-gray text-sm text-center mb-11'>Check out our new furniture collection! Cozy sofa, fancy chair, wooden casket, and many more. The new collection brings an informal elegance to your home.</p>
			</div>
			<div className='container'>
				<GoodsList goodsList={$$goodsList}/>
				<span className="flex justify-center mb-10">
					<BrownAnimatedButton text="VIEW MORE" animation='leftToRight'
					onClick={() => redirectToShop()}/>
				</span>
			</div>
		</div>
	)
}
//$$goodsList.changeLastItemId(goods[goods.length-1].id)



export default Home