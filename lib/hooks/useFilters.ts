import { FiltersSearchParams } from '@/model/filters';
import { useQueryStates } from 'nuqs';
import { productsFiltersSearchParams } from '../loaders/productsFilters';
import { useLayoutEffect, useState } from 'react';

export interface IFilters {
	filterQueries: FiltersSearchParams,
	setFilterQueries: (value: Partial<FiltersSearchParams> | null) => void
	clearFilters: () => void,
	isDirty: boolean
}

export const useFilters = (): IFilters => {
	const [isDirty, setIsDirty] = useState(false);
	const [filterQueries, setFilterQueries] = useQueryStates(productsFiltersSearchParams);

	const clearFilters = () => setFilterQueries(null)

	useLayoutEffect(() => {
		if (filterQueries.categoryId === 0) {
			filterQueries.categoryId = null;
			setFilterQueries({ categoryId: null })
		}

		if (filterQueries.discounted === false) {
			filterQueries.discounted = null;
			setFilterQueries({ discounted: null })
		}

		setIsDirty(Object.values(filterQueries).some((value) => value !== null));
	}, [filterQueries, setFilterQueries]);

	return {
		filterQueries,
		setFilterQueries,
		clearFilters,
		isDirty
	}
}