'use client';
import cn from 'classnames';
import { FC, memo, useCallback } from 'react';
import { PaginationProps } from './types';
import Link from 'next/link';
import ArrowIcon from './arrow.svg';
import styles from './Pagination.module.scss';
import { usePaginationTemplate } from '@/lib/hooks/Pagination/usePaginationTemplate';

const PaginationComponent: FC<PaginationProps> = ({
	className,
	totalPages,
	pagesToShow,
	isLoading,
	setIsLoading,
	...props
}) => {
	const paginationTemplate = usePaginationTemplate(totalPages, pagesToShow);
	const onClick = useCallback(() => {
		if (!isLoading && setIsLoading) {
			setIsLoading(true);
		}
	}, [isLoading, setIsLoading]);

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
								onClick={onClick}
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
								onClick={onClick}
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

export const Pagination = memo(PaginationComponent);