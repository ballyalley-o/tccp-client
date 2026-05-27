import { type LocaleKey } from "lib/tool";

type FilterItemType = {
    id   : string
    label: LocaleKey
    value: string
}

type FilterType = {
  BOOTCAMP_1: FilterItemType[]
}


export const FILTER: FilterType = {
    BOOTCAMP_1: [
        {
            id   : 'rating-1',
            label: 'filters.bootcamp.rating',
            value: 'rating'

        },
        {
            id   : 'averageCost-2',
            label: 'filters.bootcamp.averageCost',
            value: 'averageCost'

        },
        {
            id   : '-averageCost-3',
            label: 'filters.bootcamp.-averageCost',
            value: '-averageCost'

        },
        {
            id   : 'name-4',
            label: 'filters.bootcamp.name',
            value: 'name'

        }
    ]
}