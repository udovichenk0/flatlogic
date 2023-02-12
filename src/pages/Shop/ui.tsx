import { RangeInput } from "@/shared/ui/range-input"
import { GoodsList } from "@/widgets/goods-list"
import { useStore } from "effector-react"
import { $$goodsList, MAX, MAX_DEFAULT, MIN, rangeChanged } from "./model"
import Range  from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from "react";

const Shop = () => {
	const [values, setValue] = useState<number[]>([MIN,MAX_DEFAULT])
	return (
		<div className="container">
			<div className="pt-10">
				<div className="mb-10">
					<div className="w-[300px]">
						<div className="mb-3">Price Range: ${values[0]} - ${values[1]}</div>
						<Range min={MIN} max={MAX} step={1}
						range defaultValue={[0, 700]} railStyle={{backgroundColor: '#eee'}}
						onChange={(value:any) => setValue(value)}
						onAfterChange={(value:any) => rangeChanged(value)}
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