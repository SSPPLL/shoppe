'use client';
import { FC, useMemo, useState } from 'react';
import { FiltersProps } from './types';
import { CategorySelect, DiscountSwitch, PriceRange, Search } from '../../features';
import { notFound, useSearchParams } from 'next/navigation';
import { isMinMaxValuesValid } from '@/lib/utils/isMinMaxValuesValid';
import FiltersIcon from './filters.svg'
import styles from './Filters.module.scss';
import cn from 'classnames';
import { useBreakpoint } from '@/lib/hooks/useBreakpoint';
import { motion, useReducedMotion } from 'framer-motion';

export const Filters: FC<FiltersProps> = ({ className, minPrice, maxPrice, categories }) => {
	const searchParams = useSearchParams();
	const min = searchParams.get('minPrice');
	const max = searchParams.get('maxPrice');
	const discount = searchParams.get('discounted');
	const catagory = searchParams.get('categoryId');

	const [opened, setOpened] = useState<boolean>(false);
	const isMaxLg = useBreakpoint('max', 'lg');
	const tabIndex = useMemo(() => isMaxLg ? -1 : 0, [isMaxLg]);

	const shouldReduceMotion = useReducedMotion();


	if (!isMinMaxValuesValid({ defaultMin: minPrice, defaultMax: maxPrice, min, max })) {
		notFound();
	}

	if (discount && !['true', 'false'].includes(discount)) {
		notFound();
	}

	if (catagory && !categories.map(({ id }) => id.toString()).includes(catagory)) {
		notFound();
	}

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
						options={categories}
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
				</div>
			</motion.aside>
		</div>
	);
}