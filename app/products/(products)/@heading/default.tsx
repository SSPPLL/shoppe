import styles from "./default.module.scss";
import { ReactElement } from "react";

export default function ProductsHeading(): ReactElement {
	return (
		<h1 className={styles.title}>Каталог товаров</h1>
	);
}
