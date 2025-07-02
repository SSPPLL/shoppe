'use client'
import { BREAKPOINTS } from '@/config/breakpoints';
import { useState, useEffect } from 'react';

export const useBreakpoint = (type: 'min' | 'max', breakpoint: keyof typeof BREAKPOINTS) => {
	const query = `(${type}-width: ${BREAKPOINTS[breakpoint] + (type === 'min' ? 1 : 0)}px)`;
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		const handler = () => setMatches(media.matches);
		setMatches(media.matches);

		media.addEventListener('change', handler);
		return () => media.removeEventListener('change', handler);
	}, [query]);

	return matches;
}