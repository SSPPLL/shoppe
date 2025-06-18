import { useEffect, useState } from 'react';

export const useScrollY = () => {
	const [scrollY, setScrollY] = useState<number>(0);

	const handleScroll = () => setScrollY(window.scrollY);

	useEffect(() => {
		setScrollY(window.scrollY)
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	return scrollY;
};