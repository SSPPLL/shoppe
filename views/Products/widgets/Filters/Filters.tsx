'use client';
import FiltersIcon from './filters.svg'
import { FC, memo, ReactElement, useState } from 'react';
import { FiltersProps } from './types';
import { CategorySelect, DiscountSwitch, PriceRange, Search } from '../../features';
import { useBreakpoint } from '@/lib/hooks/useBreakpoint';
import { motion, useReducedMotion } from 'framer-motion';
import { useFilters } from '@/lib/hooks/useFilters';
import styles from './Filters.module.scss';
import cn from 'classnames';

const FiltersComponent: FC<FiltersProps> = ({
	className,
	minPrice,
	maxPrice,
	categories
}): ReactElement => {
	const [opened, setOpened] = useState<boolean>(false);
	const isMaxLg = useBreakpoint('max', 'lg');
	const tabIndex = isMaxLg ? -1 : 0;

	const shouldReduceMotion = useReducedMotion();
	const { clearFilters, isDirty } = useFilters();

	return (
		<div className={cn(styles.filters, className)}>
			<button
				type='button'
				className={styles.button}
				aria-label={opened ? 'Закрыть фильтры' : 'Открыть фильтры'}
				aria-expanded={opened}
				onClick={() => setOpened(!opened)}
			>
				<FiltersIcon />
				Фильтры
			</button>
			<motion.aside
				className={styles.aside}
				variants={{
					opened: !isMaxLg ? {} : {
						height: 'auto',
					},
					closed: !isMaxLg ? {} : {
						height: 0
					}
				}}
				initial={opened ? 'opened' : 'closed'}
				animate={opened ? 'opened' : 'closed'}
				transition={{
					duration: shouldReduceMotion ? 0 : 0.3
				}}
				tabIndex={tabIndex}
			>
				<div className={styles.content}>
					<Search
						className={styles.search}
						mainTabIndex={tabIndex}
					/>
					<CategorySelect
						className={styles.category}
						options={[{ id: 0, name: 'Все категории' }, ...categories]}
						mainTabIndex={tabIndex}
					/>
					<PriceRange
						className={styles['price-range']}
						min={minPrice}
						max={maxPrice}
						mainTabIndex={tabIndex}
					/>
					<DiscountSwitch
						className={styles.discount}
						mainTabIndex={tabIndex}
					/>

					{isDirty && <button className={styles.clear} onClick={clearFilters}>Очистить фильтры</button>}
				</div>
			</motion.aside>
		</div>
	);
}

export const Filters = memo(FiltersComponent);