/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddAccount, Authentication } from "../../../domain/usecases";
import { SaveAccessToken } from "../../../domain/usecases/save-access-token";
import { LoginHeader, Input, FormStatus, Footer } from "../../components";
import Context from "../../contexts/form/form-contex";
import { Validation } from "../../protocols/validation";

import styles from "./signup-styles.module.scss";

interface Props {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken;
}

function Signup({ validation, addAccount, saveAccessToken }: Props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    isLoading: false,
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    passwordConfirmationError: "",
    mainError: "",
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate("name", state.nameError) || "",
      emailError: validation.validate("email", state.emailError) || "",
      passwordError: validation.validate("password", state.emailError) || "",
      passwordConfirmationError:
        validation.validate(
          "passwordConfirmation",
          state.passwordConfirmationError
        ) || "",
    });
  }, [
    state.name,
    state.email,
    state.passwordError,
    state.passwordConfirmation,
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (
        state.isLoading ||
        state.nameError ||
        state.emailError ||
        state.passwordError ||
        state.passwordConfirmationError
      ) {
        return;
      }

      setState({ ...state, isLoading: true });
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });

      await saveAccessToken.save(account!.accessToken);
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
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            data-testid="submit"
            disabled={
              !!state.nameError ||
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            }
            type="submit"
            className={styles.submit}
          >
            Entrar
          </button>
          <span className={styles.link}>Voltar para login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
}

export default Signup;
