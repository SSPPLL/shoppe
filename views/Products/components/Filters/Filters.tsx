'use client';
import { FC } from 'react';
import { Search } from '../Search/Search';
import { PriceRange } from '../PriceRange/PriceRange';
import { FiltersProps } from './types';
import styles from './Filters.module.scss';
import cn from 'classnames';
import { notFound, useSearchParams } from 'next/navigation';
import { isMinMaxValuesValid } from '@/lib/utils/isMinMaxValuesValid';
import { DiscountSwitch } from '../DiscountSwitch/DiscountSwitch';
import { CategorySelect } from '../CategorySelect/CategorySelect';

export const Filters: FC<FiltersProps> = ({ className, minPrice, maxPrice, categories, ...props }) => {
	const searchParams = useSearchParams();
	const min = searchParams.get('minPrice');
	const max = searchParams.get('maxPrice');
	const discount = searchParams.get('discounted');
	const catagory = searchParams.get('categoryId');

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
			<aside className={styles.aside} {...props}>
				<Search className={styles.search} />
				<CategorySelect className={styles.category} options={categories} />
				<PriceRange
					className={styles['price-range']}
					min={minPrice}
					max={maxPrice}
				/>
				<DiscountSwitch className={styles.discount} />
			</aside>
		</div>
	);
}