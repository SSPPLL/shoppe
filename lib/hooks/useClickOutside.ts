import { RefObject, useEffect } from 'react';

export const useClickOutside = (
	ref: RefObject<HTMLElement>,
	callback: () => void,
	enabled: boolean = true // 👈 флаг активности
) => {
	useEffect(() => {
		if (!enabled) return;

		function handleClickOutside(event: MouseEvent | TouchEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [ref, callback, enabled]);
}