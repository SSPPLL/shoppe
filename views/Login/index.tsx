import { memo, ReactElement } from 'react';
import styles from './page.module.scss';

export const LoginPageComponent = memo(function Component(): ReactElement {
	return <form className={styles.form}></form>;
})