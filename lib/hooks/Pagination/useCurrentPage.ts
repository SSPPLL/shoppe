import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useCurrentPage = (): number => {
	const { page } = useParams();
	return useMemo<number>(() => Number(page || '1'), [page]);
}