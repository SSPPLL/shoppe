'use client';
import cn from 'classnames';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { PriceRangeProps } from './types';
import { useQueryState } from 'nuqs';
import { Range, getTrackBackground } from "react-range";
import { debounce } from 'lodash';
import styles from './PriceRange.module.scss';

export const PriceRange: FC<PriceRangeProps> = ({ className, min, max, ...props }) => {
	const [firstRender, setFirstRender] = useState(true);
	const [minQuery, setMinQuery] = useQueryState('minPrice');
	const [maxQuery, setMaxQuery] = useQueryState('maxPrice');
	const isMinQuery = minQuery !== null && !Number.isNaN(Number(minQuery));
	const isMaxQuery = maxQuery !== null && !Number.isNaN(Number(maxQuery));
	const minValue = isMinQuery ? Math.min(Math.max(Number(minQuery), min), max) : min;
	const maxValue = isMaxQuery ? Math.max(Math.min(Number(maxQuery), max), min) : max;
	const [values, setValues] = useState<number[]>([
		minValue > maxValue ? min : minValue,
		maxValue < minValue ? max : maxValue
	]);

	const setQueryParams = useCallback((values: number[]) => {
		setMinQuery(values[0].toString());
		setMaxQuery(values[1].toString());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setQueryParamsDebounced = useMemo(() => {
		return debounce((values: number[]) => setQueryParams(values), 500);
	}, [setQueryParams]);

	const onChange = useCallback((values: number[]) => setValues(values), []);

	useEffect(() => {
		if (firstRender) {
			setFirstRender(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!firstRender && (values[0] !== minValue || values[1] !== maxValue)) {
		setQueryParamsDebounced(values);
	}

	return (
		<div className={cn(styles.wrapper, className)} {...props}>
			<Range
				label='Цена'
				min={min}
				max={max}
				values={values}
				onChange={onChange}
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
					/>
				)}
			/>
			<div className={styles.label}>Цена: ${values[0]} - ${values[1]}</div>
		</div>
	);
};