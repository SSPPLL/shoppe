import { Root, Trigger, Content, Viewport, Item, ItemText, Value } from "@radix-ui/react-select"
import { FC, ReactElement } from 'react'
import styles from './Select.module.scss'
import cn from 'classnames'
import { SelectProps } from './types'
import ArrowIcon from './arrow.svg'

export const Select: FC<SelectProps> = ({
	className,
	value,
	setValue,
	options,
	placeholder,
	ariaLabel,
	mainTabIndex = 0
}): ReactElement => {
	return (
		<div className={cn(styles.wrapper, className)}>
			<Root value={value} onValueChange={setValue}>
				<Trigger className={styles.trigger} aria-label={ariaLabel} tabIndex={mainTabIndex}>
					<Value placeholder={placeholder} />
					<ArrowIcon className={styles.arrow} />
				</Trigger>
				<Content className={styles.content}>
					<Viewport>
						{options.map((option) => (
							<Item
								key={option.value}
								value={option.value}
								className={styles.item}
							>
								<ItemText>{option.label}</ItemText>
							</Item>
						))}
					</Viewport>
				</Content>
			</Root>
		</div>
	)
}