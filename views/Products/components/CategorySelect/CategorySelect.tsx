import { FC, useMemo, useState } from "react"
import { CategorySelectProps } from './types'
import { useQueryState } from 'nuqs'
import { throttle } from 'lodash'
import { Select } from '@/components/ui'

export const CategorySelect: FC<CategorySelectProps> = ({ className, options }) => {
	const [categoryQuery, setCategoryQuery] = useQueryState('categoryId');
	const [value, setValue] = useState<string>(categoryQuery || '');

	const setCategoryThrottled = useMemo(() => {
		return throttle((category: string) => setCategoryQuery(category), 500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (categoryQuery !== value && value.length) {
		setCategoryThrottled(value);
	}

	return (
		<Select
			ariaLabel="Фильтровать товары по категориям"
			className={className}
			placeholder="Категория"
			value={value}
			setValue={setValue}
			options={options.map(({ id, name }) => ({ label: name, value: id.toString() }))}
		/>
	)
}
