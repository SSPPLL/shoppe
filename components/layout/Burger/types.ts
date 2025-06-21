import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface BurgerProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	isOpened?: boolean
};