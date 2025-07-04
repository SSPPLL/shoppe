'use client';
import { FC, ReactElement, useEffect, useMemo } from 'react';
import { CarouselProps } from './types';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './Carousel.module.scss';
import cn from 'classnames';
import { EmblaPluginType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import ClassNames from 'embla-carousel-class-names'
import { DotButton, useDotButton } from './DotButton';

export const Carousel: FC<CarouselProps> = ({
	setApi,
	slides,
	children,
	isDots = false,
	className,
	viewportClassName,
	containerClassName,
	dotsClassName,
	dotClassName,
	activeDotClassName = '',
	emblaOptions = {},
	autoplayOptions = {},
	fadeOptions = {},
	classNamesOptions = {},
	...props
}): ReactElement => {
	const emblaModules = useMemo(() => {
		const plugins: EmblaPluginType[] = [];

		if (Object.keys(autoplayOptions).length) {
			plugins.push(Autoplay(autoplayOptions));
		}

		if (Object.keys(fadeOptions).length) {
			plugins.push(Fade(fadeOptions));
		}

		if (Object.keys(classNamesOptions).length) {
			plugins.push(ClassNames(classNamesOptions));
		}

		return plugins;
	}, [autoplayOptions, classNamesOptions, fadeOptions])

	const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, emblaModules);
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi!)

	useEffect(() => {
		if (emblaApi) {
			setApi?.(emblaApi);
		}
	}, [emblaApi, setApi])

	return (
		<div className={cn(styles.wrapper, className)} {...props}>
			<div className={cn(styles.viewport, viewportClassName)} ref={emblaRef}>
				<div className={cn(styles.container, containerClassName)}>
					{slides}
				</div>
			</div>
			{children}
			{isDots && <div className={cn(styles.dots, dotsClassName)}>
				{scrollSnaps.map((_, index) => (
					<DotButton
						key={index}
						onClick={() => onDotButtonClick(index)}
						className={cn(dotClassName, {
							[styles.active]: index === selectedIndex,
							[activeDotClassName]: index === selectedIndex
						})}
						aria-label={`Переход к слайду ${index + 1}`}
					/>
				))}
			</div>}
		</div>
	);
}