import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { SliderHeroCard } from '@/entities/Cards/SliderCard'
import { SliderBlock } from '@/widgets/SliderBlock'

import firstCard from '/first.webp'
import secondCard from '/second.webp'
import thirdCard from '/third.webp'
import { GoodCard } from '@/entities/Cards/Good'
import { getGoods } from '@/shared/api/Goods'
import { $$goodsList } from './home.module'
import { GoodsList } from '@/widgets/goods-list'
import { useStore } from 'effector-react'


const Home = () => {
	return (
		<div>
			<div className='mb-20'>
				<SliderBlock>
					<SliderHeroCard type='CHAIR' title='get all' description='the good stuff' backImage={firstCard}/>
					<SliderHeroCard type='CHAIR' title='get all' description='the good stuff' backImage={secondCard}/>
					<SliderHeroCard type='CHAIR' title='get all' description='the good stuff' backImage={thirdCard}/>
				</SliderBlock>
			</div>
			<div className='container flex flex-col items-center'>
				<h2 className='text-base-dark text-[24px] font-bold mb-6'>New Arrivals</h2>
				<p className='max-w-[600px] text-gray text-sm text-center mb-11'>Check out our new furniture collection! Cozy sofa, fancy chair, wooden casket, and many more. The new collection brings an informal elegance to your home.</p>
			</div>
			<div className='container'>
				{/* <GoodCard goods={$$goodsList.$goods}/> */}
				<GoodsList goodsList={$$goodsList}/>
			</div>
		</div>
	)
}



export default Home