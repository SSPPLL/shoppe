import { ButtonAllowedTags, ButtonProps, TButtonProps, TLinkProps } from './types';
import styles from './Button.module.scss';
import cn from 'classnames';
import { ReactElement } from 'react';
import Link from 'next/link';

export const Button = <T extends ButtonAllowedTags = 'button'>({
	as = 'button' as T,
	className,
	children,
	appearance = 'primary',
	color = 'dark',
	rounded = 'sm',
	fontSize = 'sm',
	...props
}: ButtonProps<T>): ReactElement => {
	const buttonClassName = cn(
		styles.button,
		styles[color],
		styles[appearance],
		styles[`rounded-${rounded}`],
		styles[`font-${fontSize}`],
		className
	);

	if (as === 'a') {
		const linkProps = props as TLinkProps;
		return (
			<Link
				className={buttonClassName}
				{...linkProps}
			>
				{children}
			</Link>
		)
	}

	const buttonProps = props as TButtonProps;

	return (
		<button
			className={buttonClassName}
			{...buttonProps}
		>
			{children}
		</button>
	)
};