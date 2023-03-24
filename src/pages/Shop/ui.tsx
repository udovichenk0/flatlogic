import { useStore } from "effector-react";
import Range from 'rc-slider';
import { useState } from "react";
import 'rc-slider/assets/index.css';

import { GoodsList } from "@/widgets/goods-list"

import {$$goodsList, filterModel, MAX, MAX_DEFAULT, MIN} from "./model"


const Shop = () => {
	const [range] = useStore(filterModel.$filters)
	const [values, setValue] = useState<number[]>([range.min,range.max])
	return (
		<div className="container">
			<div className="pt-10">
				<div className="mb-10">
					<div className="w-[300px]">
						<div className="mb-3">Price Range: ${values[0]} - ${values[1]}</div>
						<Range min={MIN} max={MAX} step={1}
						range defaultValue={[range.min, range.max]} railStyle={{backgroundColor: '#eee'}}
						onChange={(value:any) => setValue(value)}
						onAfterChange={(value:any) => filterModel.filterRangeChanged(value)}
						trackStyle={{backgroundColor: '#bd744c'}}
						handleStyle={{backgroundColor: '#bd744c'}}/>
					</div>
				</div>
				<GoodsList goodsModel={$$goodsList}/>
			</div>
		</div>
	)
}

export default Shop