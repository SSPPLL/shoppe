import { FC, ReactElement } from 'react'
import styles from './FieldError.module.scss'
import cn from 'classnames'
import { FieldErrorProps } from './types'

export const FieldError: FC<FieldErrorProps> = ({
	children,
	className,
	...props
}): ReactElement => {
	return (
		<span {...props} className={cn(styles['error-message'], className)}>{children}</span>
	)
}