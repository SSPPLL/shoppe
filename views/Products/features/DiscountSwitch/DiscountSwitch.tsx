'use client';
import cn from 'classnames';
import { FC, ChangeEvent, useCallback, ReactElement } from 'react';
import { DiscountSwitchProps } from './types';
import styles from './DiscountSwitch.module.scss';
import { Switch } from '@/components/ui';
import { useFilters } from '@/lib/hooks/useFilters';

export const DiscountSwitch: FC<DiscountSwitchProps> = ({ className, mainTabIndex = 0, ...props }): ReactElement => {
	const { filterQueries, setFilterQueries } = useFilters();
	const { discounted } = filterQueries;

	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setFilterQueries({ discounted: event.target.checked });
	}, [setFilterQueries]);

	return (
		<div className={cn(styles.wrapper, className)} {...props}>
			<span className={styles.name}>Со скидкой</span>
			<Switch
				aria-label='Фильтровать товары по скидкам'
				name='discount'
				checked={discounted || false}
				onChange={onChange}
				tabIndex={mainTabIndex}
			/>
		</div>
	);
};