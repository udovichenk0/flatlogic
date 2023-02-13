import { useState } from "react";
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';

import { GoodsList } from "@/widgets/goods-list"

import { $$goodsList, MAX, MAX_DEFAULT, MIN } from "./model"
import { Pagination } from "@/shared/ui/pagination";
import { useStore } from "effector-react";

const Shop = () => {
	const goods = useStore($$goodsList.$goods)
	const total = useStore($$goodsList.$total)
	const [range] = useStore($$goodsList.$filters)
	const [values, setValue] = useState<number[]>([range.min,range.max])
	return (
		<div className="container">
			<div className="pt-10">
				<div className="mb-10">
					<div className="w-[300px]">
						<div className="mb-3">Price Range: ${values[0]} - ${values[1]}</div>
						<Range min={MIN} max={MAX} step={1}
						range defaultValue={[MIN, MAX_DEFAULT]} railStyle={{backgroundColor: '#eee'}}
						onChange={(value:any) => setValue(value)}
						onAfterChange={(value:any) => $$goodsList.changeRange(value)}
						trackStyle={{backgroundColor: '#bd744c'}}
						handleStyle={{backgroundColor: '#bd744c'}}/>
					</div>
				</div>
				<GoodsList goodsModel={$$goodsList}/>
				<Pagination total={total} current={1}
				actionPrev={() => $$goodsList.changeLastItemId({id: goods[goods.length-1].id, direction: 'prev'})}
				actionNext={() => $$goodsList.changeLastItemId({id: goods[0].id, direction: 'next'})}/>
			</div>
		</div>
	)
}

export default Shop