import { useState } from 'react';
import  Range  from 'rc-slider';
import 'rc-slider/assets/index.css';


export const RangeInput = () => {
	const [values, setValues] = useState<number[]>([50])
	return (
		<Range min={1} max={1500} step={1} range className=''/>
	)
}