import { EmblaCarouselType } from 'embla-carousel'
import { DetailedHTMLProps, FC, HTMLAttributes, ReactElement, useCallback, useEffect, useState } from 'react'

export interface IUseDotButton {
	selectedIndex: number
	scrollSnaps: number[]
	onDotButtonClick: (index: number) => void
}

export const useDotButton = (emblaApi: EmblaCarouselType) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

	const onDotButtonClick = useCallback(
		(index: number) => {
			if (!emblaApi) return
			emblaApi.scrollTo(index)
		},
		[emblaApi]
	)

	const onInit = useCallback((emblaApi: EmblaCarouselType) => {
		setScrollSnaps(emblaApi.scrollSnapList())
	}, [])

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setSelectedIndex(emblaApi.selectedScrollSnap())
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		onInit(emblaApi)
		onSelect(emblaApi)
		emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
	}, [emblaApi, onInit, onSelect])

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick
	}
}

export type DotButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const DotButton: FC<DotButtonProps> = ({ children, ...props }): ReactElement => {
	return (
		<button type="button" {...props}>
			{children}
		</button>
	)
}
