import { FC, memo, ReactElement } from 'react';
import styles from './page.module.scss';

export const RegisterPageComponent: FC = memo(function Component(): ReactElement {
	return <form className={styles.form}></form>;
});