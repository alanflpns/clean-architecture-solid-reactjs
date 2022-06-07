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

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submitButton = sut.getByTestId("submit");
  fireEvent.click(submitButton);
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
) => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
) => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
) => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || "Tudo certo");
  expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
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

    simulateStatusForField(sut, "email", validationError);
    simulateStatusForField(sut, "password", validationError);
  });

  it("Should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    simulateStatusForField(sut, "email", validationError);
  });

  it("Should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    simulateStatusForField(sut, "password", validationError);
  });

  it("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateStatusForField(sut, "email");
  });

  it("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simulateStatusForField(sut, "password");
  });

  it("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it("Should show spinner on submit", () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  it("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });
});
