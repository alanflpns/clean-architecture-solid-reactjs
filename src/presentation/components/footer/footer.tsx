import { memo } from "react";
import styles from "./footer-styles.module.scss";

function Footer() {
  return <footer className={styles.footer} />;
}

export default memo(Footer);
