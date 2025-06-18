import Link from 'next/link';
import styles from "./page.module.scss";
import { ReactElement } from "react";
import { ROUTES } from '@/config/routes';

export default function LoginHead(): ReactElement {
	return (
		<>
			<h1 className={styles.title}>Мой аккаунт</h1>
			<div>
				<Link href={ROUTES.AUTH.LOGIN}>Войти</Link>
				<Link href={ROUTES.AUTH.REGISTER}>Зарегистрироваться</Link>
			</div>
		</>
	);
}
