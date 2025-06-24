import styles from "./page.module.scss";
import { ReactElement } from "react";

export default function CartPage(): ReactElement {
	return (
		<h1 className={styles.title}>Корзина</h1>
	);
}
