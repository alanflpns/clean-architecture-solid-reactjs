import { useState } from "react";
import { LoginHeader, Input, FormStatus, Footer } from "../../components";
import Context from "../../contexts/form/form-contex";

import styles from "./login-styles.module.scss";

function Login() {
  const [state] = useState({
    isLoading: false,
  });

  const [errorState] = useState({
    email: "Campo obrigatório",
    password: "Campo obrigatório",
    main: "",
  });

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled
            type="submit"
            className={styles.submit}
          >
            Entrar
          </button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
}

export default Login;
