import * as Select from "@radix-ui/react-select"
import { FC, useEffect, useMemo, useState } from "react"
import { CategorySelectProps } from './types'
import ArrowIcon from './arrow.svg'
import styles from './CategorySelect.module.scss'
import cn from 'classnames'
import { useQueryState } from 'nuqs'
import { debounce } from 'lodash'

export const CategorySelect: FC<CategorySelectProps> = ({ className, options }) => {
	const [categoryQuery, setCategoryQuery] = useQueryState('category');
	const [value, setValue] = useState<string>(categoryQuery || '');

	const setCategoryDebounced = useMemo(() => {
		return debounce((category: string) => setCategoryQuery(category), 500);
	}, []);

	useEffect(() => {
		if (!value && !categoryQuery) {
			return;
		}

		setCategoryDebounced(value);
	}, [value]);

	return (
		<div className={cn(styles.wrapper, className)}>
			<Select.Root value={value} onValueChange={setValue}>
				<Select.Trigger className={styles.trigger} aria-label="Фильтровать товары по категориям">
					<Select.Value placeholder="Категория" />
					<ArrowIcon className={styles.arrow} />
				</Select.Trigger>

				<Select.Content
					className={styles.content}
				>
					<Select.Viewport>
						{options.map((option) => (
							<Select.Item
								key={option.value}
								value={option.value}
								className={styles.item}
							>
								<Select.ItemText>{option.label}</Select.ItemText>
							</Select.Item>
						))}
					</Select.Viewport>
				</Select.Content>
			</Select.Root>
		</div>
	)
}
