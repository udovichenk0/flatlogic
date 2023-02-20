import { BrownAnimatedButton } from '@/shared/ui/Buttons/brown-animated-button'
import { SliderHeroCard } from '@/shared/ui/slider-card'

import { GoodsList } from '@/widgets/goods-list'
import { SliderBlock } from '@/widgets/SliderBlock'

import firstCard from '/first.webp'
import secondCard from '/second.webp'
import thirdCard from '/third.webp'
import chair from '/chair.png'

import { $$goodsList, redirectToShop } from './model'

import 'keen-slider/keen-slider.min.css'

const Home = () => {
	return (
		<div>
			<SliderBlock>
				<SliderHeroCard type={'CHAIR'} title={'get all'} description={'the good stuff'} backImage={firstCard} action={redirectToShop} />
				<SliderHeroCard type={'CHAIR'} title={'get all'} description={'the good stuff'} backImage={secondCard} action={redirectToShop} />
				<SliderHeroCard type={'CHAIR'} title={'get all'} description={'the good stuff'} backImage={thirdCard} action={redirectToShop} />
			</SliderBlock>

			<div className='container flex flex-col items-center'>
				<h2 className='text-base-dark text-[24px] font-bold mb-6'>New Arrivals</h2>
				<p className='max-w-[600px] text-gray text-sm text-center mb-11'>Check out our new furniture collection! Cozy sofa, fancy chair, wooden casket, and many more. The new collection brings an informal elegance to your home.</p>
			</div>

			<div className='container'>
				<GoodsList goodsModel={$$goodsList}/>
				<span className="flex justify-center mb-16">
					<BrownAnimatedButton text="VIEW MORE" animation='leftToRight'
					onClick={() => redirectToShop()}/>
				</span>
			</div>

			<div style={{backgroundImage: `url(${chair})`}} className='flex items-center mb-20 h-[500px] bg-no-repeat bg-right bg-[#f5f5f5]'>
				<div className='container text-base-dark'>
					<h2 className='font-bold text-lg'>NEWS AND INSPIRATION</h2>
					<h1 className='font-bold text-[50px] my-0 pt-5 py-7 mb-8 after:content-[""] relative after:bg-brown after:w-16 after:h-2 after:rounded-md after:bottom-0 after:left-0 after:absolute'>NEW ARRIVALS</h1>
					<div className='flex gap-3 mb-10'>
						<div className='flex flex-col w-16 h-16 items-center justify-center border border-base-dark'>
							<span className='font-bold text-brown'>0</span>
							<span className='text-gray'>days</span>
						</div>
						<div className='flex flex-col w-16 h-16 items-center justify-center border border-base-dark'>
							<span className='font-bold text-brown'>0</span>
							<span className='text-gray'>hours</span>
						</div>
						<div className='flex flex-col w-16 h-16 items-center justify-center border border-base-dark'>
							<span className='font-bold text-brown'>0</span>
							<span className='text-gray'>mins</span>
						</div>
						<div className='flex flex-col w-16 h-16 items-center justify-center border border-base-dark'>
							<span className='font-bold text-brown'>0</span>
							<span className='text-gray'>secs</span>
						</div>

					</div>
					<div className='flex gap-3 items-center'>
						<span className='line-through text-gray text-[28px]'>$ 140,56</span>
						<span className='font-bold text-[35px] text-brown'>$70</span>
					</div>
				</div>
			</div>
		</div>
	)
}
//$$goodsList.changeLastItemId(goods[goods.length-1].id)



export default Home