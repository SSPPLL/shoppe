'use client';
import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { PriceRangeProps } from './types';
import { Range, getTrackBackground } from "react-range";
import styles from './PriceRange.module.scss';
import { useFilters } from '@/lib/hooks/useFilters';

export const PriceRange: FC<PriceRangeProps> = ({ className, min, max, mainTabIndex = 0, ...props }) => {
	const [firstRender, setFirstRender] = useState(true);
	const { filterQueries, setFilterQueries } = useFilters();
	const { priceMin, priceMax } = filterQueries;
	const isMinQuery = priceMin !== null && !Number.isNaN(Number(priceMin));
	const isMaxQuery = priceMax !== null && !Number.isNaN(Number(priceMax));
	const minValue = isMinQuery ? Math.min(Math.max(Number(priceMin), min), max) : min;
	const maxValue = isMaxQuery ? Math.max(Math.min(Number(priceMax), max), min) : max;
	const [values, setValues] = useState<number[]>([
		minValue > maxValue ? min : minValue,
		maxValue < minValue ? max : maxValue
	]);

	const setQueryParams = useCallback((values: number[]) => {
		setFilterQueries({ priceMin: values[0], priceMax: values[1] });
	}, [setFilterQueries]);
	const onChange = useCallback((values: number[]) => setValues(values), []);

	useEffect(() => {
		if (firstRender) {
			setFirstRender(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={cn(styles.wrapper, className)} {...props}>
			<Range
				label='Цена'
				min={min}
				max={max}
				values={values}
				onChange={onChange}
				onFinalChange={setQueryParams}
				renderTrack={({ props, children }) => (
					<div
						{...props}
						className={styles.track}
						style={{
							background: getTrackBackground({
								values,
								colors: ['var(--c-grey)', 'var(--c-black)', 'var(--c-grey)'],
								min,
								max
							})
						}}
					>
						{children}
					</div>
				)}
				renderThumb={({ props, index }) => (
					<div
						{...props}
						key={props.key}
						aria-label={index === 0 ? `Минимальная цена` : 'Максимальная цена'}
						className={cn(styles.thumb, {
							[styles.hidden]: firstRender
						})}
						tabIndex={mainTabIndex}
					/>
				)}
			/>
			<div className={styles.label}>Цена: ${values[0]} - ${values[1]}</div>
		</div>
	);
};