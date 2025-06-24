'use client';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import { IPaginationInfo, IPaginationTemplateItem, PaginationProps } from './types';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ArrowIcon from './arrow.svg';
import styles from './Pagination.module.scss';

const usePaginationInfo = (totalPages: number, pagesToShow: number): IPaginationInfo => {
	const { page: pageParam } = useParams();
	const currentPage = useMemo<number>(() => Number(pageParam || '1'), [pageParam]);
	const { startPage, endPage } = useMemo(() => {
		const half = Math.floor(pagesToShow / 2);
		const startPage = currentPage - half;
		const endPage = currentPage + half - (pagesToShow % 2 === 0 ? 1 : 0);
		const offset = 0;

		if (startPage <= (1 + offset)) {
			return {
				startPage: 1,
				endPage: Math.min(totalPages, pagesToShow)
			}
		}

		if (endPage >= totalPages - offset) {
			return {
				startPage: Math.max(1, totalPages - pagesToShow + 1),
				endPage: totalPages
			}
		}

		return {
			startPage: currentPage - half,
			endPage: startPage + pagesToShow - 1
		}

	}, [currentPage, pagesToShow, totalPages]);

	return {
		currentPage,
		totalPages,
		startPage,
		endPage
	}
}

const usePaginationTemplate = (totalPages: number, pagesToShow: number): IPaginationTemplateItem[] => {
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
				href: getLink(currentPage - 1),
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
				href: getLink(currentPage + 1),
			})
		}

		return Array.from(template) as IPaginationTemplateItem[];
	}, [currentPage, endPage, pathname, searchParams, startPage, totalPages])
}

export const Pagination: FC<PaginationProps> = ({ className, totalPages, pagesToShow = 3, ...props }) => {
	const paginationTemplate = usePaginationTemplate(totalPages, pagesToShow);

	if (!paginationTemplate.length) return null;

	return (
		<nav className={cn(styles.pagination, className)} {...props} role='navigation'>
			{paginationTemplate.map(({ href, page, prev, next, active }, index) => {
				if (href) {
					if (prev || next) {
						return (
							<Link
								key={index}
								href={href}
								className={cn(styles.item, {
									[styles.prev]: prev,
									[styles.next]: next
								})}
							>
								<ArrowIcon className={styles.arrow} />
								{prev && <span className='visually-hidden'>Предыдущая страница</span>}
								{next && <span className='visually-hidden'>Следующая страница</span>}
							</Link>
						)
					}

					if (page && !active) {
						return (
							<Link
								key={index}
								href={href}
								className={styles.item}
							>
								<span className='visually-hidden'>Перейти на страницу номер </span>
								{page}
							</Link>
						)
					}

					if (active) {
						return (
							<span
								key={index}
								className={cn(styles.item, styles.active)}
								aria-current='page'
								tabIndex={0}
							>
								{page}
							</span>
						)
					}
				}

				return <span key={index} className={styles.dots}>...</span>
			})}
		</nav>
	);
};