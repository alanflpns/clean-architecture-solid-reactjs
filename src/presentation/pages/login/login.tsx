/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authentication } from "../../../domain/usecases";
import { SaveAccessToken } from "../../../domain/usecases/save-access-token";
import {
  LoginHeader,
  Input,
  FormStatus,
  Footer,
  SubmitButton,
} from "../../components";
import Context from "../../contexts/form/form-contex";
import { Validation } from "../../protocols/validation";

import styles from "./login-styles.module.scss";

interface Props {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
}

function Login({ validation, authentication, saveAccessToken }: Props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };

    const emailError = validation.validate("email", formData) || "";
    const passwordError = validation.validate("password", formData) || "";

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
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
      await saveAccessToken.save(account!.accessToken);
      navigate("/", { replace: true });
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
          <SubmitButton text="Entrar" />
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
