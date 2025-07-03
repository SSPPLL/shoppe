import { FC, ReactElement } from 'react';
import styles from './page.module.scss';

export const TermsOfPurchasePageComponent: FC = (): ReactElement => {
	return <h1 className={styles.title}>Условия покупки</h1>;
};