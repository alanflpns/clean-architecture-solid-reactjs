import { memo } from "react";
import Logo from "../logo/Logo";
import styles from "./login-header-styles.module.scss";

function LoginHeader() {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
}

export default memo(LoginHeader);
