import { FC } from "react"
import { CategorySelectProps } from './types'
import { Select } from '@/components/ui'
import { useFilters } from '@/lib/hooks/useFilters'

export const CategorySelect: FC<CategorySelectProps> = ({ className, mainTabIndex = 0, options }) => {
	const { filterQueries, setFilterQueries } = useFilters();
	const { categoryId } = filterQueries;
	return (
		<Select
			ariaLabel="Фильтровать товары по категориям"
			className={className}
			placeholder="Категория"
			value={categoryId ? categoryId.toString() : ''}
			setValue={(value) => setFilterQueries({ categoryId: Number(value) })}
			options={options.map(({ id, name }) => ({ label: name, value: id.toString() }))}
			mainTabIndex={mainTabIndex}
		/>
	)
}
