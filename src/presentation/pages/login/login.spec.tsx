/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  AuthenticationSpy,
  ValidationStub,
  SaveAccessTokenMock,
  Helper,
} from "../../test";
import { Login } from "../../pages";
import faker from "faker";

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory();
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationError || "";
  const sut = render(
    <Router navigator={history} location={history.location}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );

  return {
    sut,
    validationStub,
    authenticationSpy,
    saveAccessTokenMock,
  };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const form = sut.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
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

    Helper.testStatusForField(sut, "email", validationError);
    Helper.testStatusForField(sut, "password", validationError);
  });

  it("Should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    Helper.testStatusForField(sut, "email", validationError);
  });

  it("Should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    Helper.testStatusForField(sut, "password", validationError);
  });

  it("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    Helper.testStatusForField(sut, "email");
  });

  it("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    Helper.testStatusForField(sut, "password");
  });

  it("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it("Should show spinner on submit", async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  it("Should call Authentication with correct values", async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  it("Should call Authentication only once", async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toEqual(1);
  });

  it("Should not call Authentication if form is invalid", () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    populateEmailField(sut);

    fireEvent.submit(sut.getByTestId("form"));

    expect(authenticationSpy.callsCount).toEqual(0);
  });

  // it("Should present error if Authentication fails", async () => {
  //   const { sut, authenticationSpy } = makeSut();
  //   const error = new InvalidCredentialsError();
  //   jest
  //     .spyOn(authenticationSpy, "auth")
  //     .mockReturnValueOnce(Promise.reject(error));
  //   simulateValidSubmit(sut);
  //   const errorWrap = sut.getByTestId("error-wrap");
  //   await waitFor(() => errorWrap)
  //   const mainError = sut.getByTestId("main-error");
  //   expect(mainError.textContent).toBe(error.message);
  //   expect(errorWrap.childElementCount).toBe(1);
  // });

  it("Should call saveAccessToken on success", async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();

    await simulateValidSubmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    );
    expect(history.location.pathname).toBe("/");
  });

  it("Should go signup page", () => {
    const { sut } = makeSut();
    const register = sut.getByTestId("signup");
    fireEvent.click(register);

    expect(history.location.pathname).toBe("/signup");
  });
});
