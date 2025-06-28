import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PaginationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	totalPages: number,
	pagesToShow?: number
};