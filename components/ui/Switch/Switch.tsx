import { FC, ReactElement } from 'react'
import styles from './Switch.module.scss'
import cn from 'classnames'
import { SwitchProps } from './types'

export const Switch: FC<SwitchProps> = ({ className, ...props }): ReactElement => {
	return (
		<label className={cn(styles.switcher, className)}>
			<input
				className={styles.input}
				type='checkbox'
				{...props}
			/>
			<span></span>
		</label>
	)
}