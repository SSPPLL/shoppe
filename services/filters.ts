import { API } from '@/config/api';
import { FiltersModel } from '@/model/filters';

export const getFilters = async (): Promise<FiltersModel | null> => {
	const res = await fetch(API.FILTERS, {
		next: {
			revalidate: 1000
		}
	})
	if (!res.ok) {
		return null;
	}
	return res.json();
}