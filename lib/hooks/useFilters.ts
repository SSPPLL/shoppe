import { FiltersSearchParams } from '@/model/filters';
import { useQueryStates } from 'nuqs';
import { filtersDefaults, getDirtyFilters, productsFiltersSearchParams } from '../loaders/productsFilters';
import { useCallback, useEffect, useMemo, useRef, } from 'react';
import { isEqual } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { objectToQueryString } from '../utils/query-string';

export interface IFilters {
	filterQueries: FiltersSearchParams,
	setFilterQueries: (value: Partial<FiltersSearchParams> | null) => void
	clearFilters: () => void,
	isDirty: boolean
}

export const useFilters = (handleChange?: (query: string) => void): IFilters => {
	const searchParams = useSearchParams();
	const [filterQueries, setFilterQueries] = useQueryStates(productsFiltersSearchParams);
	const prevFilterQueries = useRef<FiltersSearchParams>(filterQueries);
	const clearFilters = useCallback(() => setFilterQueries(null), [setFilterQueries]);
	const isDirty = useMemo<boolean>(() => !isEqual(filterQueries, filtersDefaults), [filterQueries]);

	useEffect(() => {
		if (!isEqual(filterQueries, prevFilterQueries.current)) {
			prevFilterQueries.current = filterQueries;
			handleChange?.(objectToQueryString(getDirtyFilters(filterQueries)));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	return {
		filterQueries,
		setFilterQueries,
		clearFilters,
		isDirty
	}
}