'use client';
import cn from 'classnames';
import { FC } from 'react';
import { PaginationProps } from './types';
import Link from 'next/link';
import ArrowIcon from './arrow.svg';
import styles from './Pagination.module.scss';
import { usePaginationTemplate } from '@/lib/hooks/Pagination/usePaginationTemplate';

export const Pagination: FC<PaginationProps> = ({ className, totalPages, pagesToShow, ...props }) => {
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
									[styles.prev]: prev
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