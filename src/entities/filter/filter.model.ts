import {combine, createEvent, createStore, sample} from "effector";

export function createFilterModel(){
    const filterRangeChanged = createEvent<[number, number]>()
    const $filterRange = createStore<{ min: number; max: number }>({
        min: 1,
        max: 700,
    });
    const $filterByOrder = createStore<"asc" | "desc">("asc");
    const $filters = combine($filterRange, $filterByOrder);

    sample({
        clock: filterRangeChanged,
        fn: ([min, max]) => ({
            min,
            max,
        }),
        target: $filterRange,
    });

    return {
        filterRangeChanged,
        $filters
    }

}