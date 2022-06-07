/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { AuthenticationSpy, ValidationStub } from "../../test";
import Login from "./login";
import faker from "faker";

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError || "";
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );

  return {
    sut,
    validationStub,
    authenticationSpy,
  };
};

describe("Login Component", () => {
  // após cada teste limpar
  afterEach(cleanup);

  it("Should start with initial state", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");

    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  it("Should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");
  });

  it("Should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  it("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Tudo certo");
    expect(emailStatus.textContent).toBe("🟢");
  });

  it("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Tudo certo");
    expect(passwordStatus.textContent).toBe("🟢");
  });

  it("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it("Should show spinner on submit", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitButton = sut.getByTestId("submit");
    fireEvent.click(submitButton);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  it("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: email },
    });
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: password },
    });
    const submitButton = sut.getByTestId("submit");
    fireEvent.click(submitButton);
    expect(authenticationSpy.params).toEqual({ email, password });
  });
});
