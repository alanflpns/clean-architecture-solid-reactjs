import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authentication } from "../../../domain/usecases";
import { LoginHeader, Input, FormStatus, Footer } from "../../components";
import Context from "../../contexts/form/form-contex";
import { Validation } from "../../protocols/validation";

import styles from "./login-styles.module.scss";

interface Props {
  validation: Validation;
  authentication: Authentication;
}

function Login({ validation, authentication }: Props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate("email", state.email) || "",
      passwordError: validation.validate("password", state.password) || "",
    });
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return;
      }

      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      localStorage.setItem("accessToken", account!.accessToken);
      navigate("/");
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: (error as any).message,
      });
    }
  };

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            type="submit"
            className={styles.submit}
          >
            Entrar
          </button>
          <Link data-testid="signup" to="/signup" className={styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
}

export default Login;
