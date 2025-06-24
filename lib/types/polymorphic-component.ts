import { ComponentProps, ElementType } from 'react';

type AsProp<T extends ElementType> = {
	as?: T;
};

export type PolymorphicComponentProps<
	T extends ElementType,
	OwnProps = unknown
> = OwnProps & AsProp<T> &
	Omit<ComponentProps<T>, keyof OwnProps | 'as' | 'children'>;