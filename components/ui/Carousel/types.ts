import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import { AutoplayOptionsType } from 'embla-carousel-autoplay';
import { ClassNamesOptionsType } from 'embla-carousel-class-names';
import { FadeOptionsType } from 'embla-carousel-fade';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface CarouselProps extends DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
	slides: ReactNode[];
	viewportClassName?: string;
	containerClassName?: string;
	dotsClassName?: string;
	dotClassName?: string;
	activeDotClassName?: string;
	emblaOptions?: Partial<EmblaOptionsType>;
	autoplayOptions?: Partial<AutoplayOptionsType>;
	fadeOptions?: Partial<FadeOptionsType>;
	classNamesOptions?: Partial<ClassNamesOptionsType>;
	isDots?: boolean,
	setApi?: (emblaApi: EmblaCarouselType) => void
}