import Footer from "../components/footer/footer";
import FormStatus from "../components/form-status/form-status";
import Input from "../components/input/input";
import Header from "../components/login-header/login-header";
import Spinner from "../components/spinner/spinner";
import styles from "./login-styles.module.scss";

function Login() {
  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit" className={styles.submit}>
          Entrar
        </button>
        <span className={styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  );
}

export default Login;
