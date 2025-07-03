import { FC, ReactElement } from 'react';
import styles from './page.module.scss';

export const DeliveryAndReturnPageComponent: FC = (): ReactElement => {
	return <h1 className={styles.title}>Доставка и возврат</h1>;
};