import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import type { LinkProps } from 'next/link';

export type ButtonAllowedTags = 'button' | 'a';

export type TLinkProps = LinkProps;
export type TButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type ButtonProps<T extends ButtonAllowedTags> = (T extends 'a' ? TLinkProps : TButtonProps) & {
	as?: T,
	color?: 'light' | 'dark',
	appearance?: 'primary' | 'secondary',
	rounded?: 'sm' | 'md',
	fontSize?: 'sm' | 'md',
	adaptive?: boolean,
	className?: string,
	children?: ReactNode
};