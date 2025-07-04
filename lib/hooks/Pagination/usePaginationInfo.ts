import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export interface IPaginationInfo {
	currentPage: number,
	totalPages: number,
	startPage: number,
	endPage: number
}

export const usePaginationInfo = (totalPages: number, pagesToShow = 3, borderOffset = 0): IPaginationInfo => {
	const { page } = useParams();
	const currentPage = Number(page || '1');
	const minMaxPage = Math.min(totalPages, Math.max(1, currentPage));
	const { startPage, endPage } = useMemo<{ startPage: number, endPage: number }>(() => {
		const half = Math.floor(pagesToShow / 2);
		const startPage = minMaxPage - half;
		const endPage = minMaxPage + half - (pagesToShow % 2 === 0 ? 1 : 0);

		if (startPage <= (1 + borderOffset)) {
			return {
				startPage: 1,
				endPage: Math.min(totalPages, pagesToShow)
			}
		}

		if (endPage >= totalPages - borderOffset) {
			return {
				startPage: Math.max(1, totalPages - pagesToShow + 1),
				endPage: totalPages
			}
		}

		return {
			startPage: minMaxPage - half,
			endPage: startPage + pagesToShow - 1
		}

	}, [borderOffset, minMaxPage, pagesToShow, totalPages]);

	return {
		currentPage: minMaxPage,
		totalPages,
		startPage,
		endPage
	}
}