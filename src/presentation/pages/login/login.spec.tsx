/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { ValidationSpy } from "../../test";
import Login from "./login";
import faker from "faker";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy,
  };
};

describe("Login Component", () => {
  // após cada teste limpar
  afterEach(cleanup);

  it("Should start with initial state", () => {
    const { sut } = makeSut();

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Campo obrigatório");
    expect(emailStatus.textContent).toBe("🔴");

    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Campo obrigatório");
    expect(passwordStatus.textContent).toBe("🔴");
  });

  it("Shoul call Validation with correct email", () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId("email");
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe(email);
  });

  it("Shoul call Validation with correct password", () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId("password");
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe(password);
  });
});
