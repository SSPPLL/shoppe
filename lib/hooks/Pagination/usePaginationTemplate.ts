import { usePathname, useSearchParams } from 'next/navigation';
import { usePaginationInfo } from './usePaginationInfo';
import { useMemo } from 'react';

export interface IPaginationTemplateItem {
	page?: number,
	prev?: boolean,
	next?: boolean,
	href?: string,
	active?: boolean
}

export const usePaginationTemplate = (totalPages: number, pagesToShow = 3): IPaginationTemplateItem[] => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { currentPage, startPage, endPage } = usePaginationInfo(totalPages, pagesToShow);

	return useMemo(() => {
		const template = new Set();
		const linkWithoutPage = pathname.split('/page')[0];
		const searchParamsString = searchParams.toString();
		const getLink = (page: number) => {
			const paramsString = searchParamsString.length ? `?${searchParamsString}` : '';
			if (page === 1) return linkWithoutPage + paramsString;
			return `${linkWithoutPage}/page/${page}${paramsString}`;
		};

		if (totalPages === 1) return [];

		if (currentPage > 1) {
			template.add({
				prev: true,
				href: getLink(Math.min(currentPage - 1, totalPages)),
			})
		}

		if (startPage > 1) template.add({})

		for (let i = startPage; i <= endPage; i++) {
			template.add({
				page: i,
				href: getLink(i),
				active: i === currentPage
			})
		}

		if (endPage < totalPages) template.add({})

		if (currentPage < totalPages) {
			template.add({
				next: true,
				href: getLink(Math.min(currentPage + 1, totalPages)),
			})
		}

		return Array.from(template) as IPaginationTemplateItem[];
	}, [currentPage, endPage, pathname, searchParams, startPage, totalPages])
}