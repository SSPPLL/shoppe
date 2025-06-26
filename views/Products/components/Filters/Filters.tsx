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

export const Filters: FC<FiltersProps> = ({ className, defaultMin, defaultMax, ...props }) => {
	const searchParams = useSearchParams();
	const min = searchParams.get('min');
	const max = searchParams.get('max');
	const discount = searchParams.get('discount');

	if (!isMinMaxValuesValid({ defaultMin, defaultMax, min, max })) {
		notFound();
	}

	if (discount && !['true', 'false'].includes(discount)) {
		notFound();
	}
	return (
		<div className={cn(styles.filters, className)}>
			<aside className={styles.aside} {...props}>
				<Search className={styles.search} />
				<PriceRange
					className={styles['price-range']}
					min={defaultMin}
					max={defaultMax}
				/>
				<DiscountSwitch className={styles.discount} />
			</aside>
		</div>
	);
}