import Footer from "../components/footer/footer";
import Header from "../components/login-header/login-header";
import Spinner from "../components/spinner/spinner";
import styles from "./login-styles.module.scss";

function Login() {
  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={styles.status}>🔴</span>
        </div>
        <div className={styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={styles.status}>🔴</span>
        </div>
        <button type="submit" className={styles.submit}>
          Entrar
        </button>
        <span className={styles.link}>Criar conta</span>
        <div className={styles.errorWrap}>
          <Spinner className={styles.spinner} />
          <span className={styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
