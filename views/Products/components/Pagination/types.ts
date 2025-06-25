import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPaginationInfo {
	currentPage: number,
	totalPages: number,
	startPage: number,
	endPage: number
}

export interface IPaginationTemplateItem {
	page?: number,
	prev?: boolean,
	next?: boolean,
	href?: string,
	active?: boolean
}

export interface PaginationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	totalPages: number,
	pagesToShow?: number
};