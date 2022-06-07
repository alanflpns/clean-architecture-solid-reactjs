import { useState, useEffect } from "react";
import { LoginHeader, Input, FormStatus, Footer } from "../../components";
import Context from "../../contexts/form/form-contex";
import { Validation } from "../../protocols/validation";

import styles from "./login-styles.module.scss";

interface Props {
  validation?: Validation;
}

function Login({ validation }: Props) {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "Campo obrigatório",
    mainError: "",
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation?.validate("email", state.email) || "",
    });
  }, [state.email]);

  useEffect(() => {
    validation?.validate("password", state.password);
  }, [state.password]);

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
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
