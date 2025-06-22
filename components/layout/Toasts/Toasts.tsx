'use client';
import { FC, useCallback, useEffect } from 'react';
import { ToastsProps } from './types';
import cn from 'classnames';
import styles from './Toasts.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { IToastItem, removeToast, useToasts } from '@/store/toasts';
import { Alert } from '@/components/ui';

const timeoutMap = new Map();
const AlertMotion = motion.create(Alert);

export const Toasts: FC<ToastsProps> = ({ className, ...props }) => {
	const toasts = useToasts();
	const onClick = useCallback((id: number) => {
		clearTimeout(timeoutMap.get(id));
		removeToast(id);
		timeoutMap.delete(id);
	}, [])

	useEffect(() => {
		return () => {
			timeoutMap.forEach((timeout) => {
				if (!timeout) return;
				clearTimeout(timeout);
			});
		}
	}, []);

	if (!toasts.length) return null;

	const last = toasts[toasts.length - 1];

	if (!timeoutMap.has(last.id)) {
		timeoutMap.set(last.id, setTimeout(() => {
			timeoutMap.delete(last.id);
			removeToast(last.id);
		}, last.delay));
	}

	return (
		<div className={cn(styles.toasts, className)} {...props}>
			<AnimatePresence>
				{toasts.map((toast: IToastItem) => (
					<AlertMotion
						layout
						key={toast.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						message={toast.message}
						shadow={true}
						onClick={() => onClick(toast.id)}
						role='alert'
					/>
				))}
			</AnimatePresence>
		</div>
	);
};