import { FC, ReactElement } from 'react'
import styles from './Input.module.scss'
import cn from 'classnames'
import { InputProps } from './types'
import { FieldError } from '../FieldError/FieldError'

export const Input: FC<InputProps> = ({
	error,
	className,
	inputClassName,
	ref,
	...props
}): ReactElement => {
	return (
		<label className={cn(styles.label, className)}>
			<input {...props} className={cn('input', inputClassName, {
				[styles.error]: error
			})} ref={ref} />
			{error && <FieldError role='alert'>{error.message}</FieldError>}
		</label>
	)
}