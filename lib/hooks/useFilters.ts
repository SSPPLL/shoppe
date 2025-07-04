import { FiltersSearchParams } from '@/model/filters';
import { useQueryStates } from 'nuqs';
import { productsFiltersSearchParams } from '../loaders/productsFilters';
import { useCallback, useLayoutEffect, useState } from 'react';

export interface IFilters {
	filterQueries: FiltersSearchParams,
	setFilterQueries: (value: Partial<FiltersSearchParams> | null) => void
	clearFilters: () => void,
	isDirty: boolean
}

export const useFilters = (): IFilters => {
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const [filterQueries, setFilterQueries] = useQueryStates(productsFiltersSearchParams);

	const clearFilters = useCallback(() => setFilterQueries(null), [setFilterQueries]);

	useLayoutEffect(() => {
		const prevFilterQueries = { ...filterQueries };

		if (prevFilterQueries.categoryId === 0) {
			prevFilterQueries.categoryId = null;
			setFilterQueries({ categoryId: null })
		}

		if (prevFilterQueries.discounted === false) {
			prevFilterQueries.discounted = null;
			setFilterQueries({ discounted: null })
		}

		setIsDirty(Object.values(prevFilterQueries).some((value) => value !== null));
	}, [filterQueries, setFilterQueries]);

	return {
		filterQueries,
		setFilterQueries,
		clearFilters,
		isDirty
	}
}