/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import {
  RenderResult,
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import faker from "faker";
import Signup from "./signup";
import {
  Helper,
  ValidationStub,
  AddAccountSpy,
  SaveAccessTokenMock,
} from "../../test";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ["/signup"] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || "";

  const addAccountSpy = new AddAccountSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();

  const sut = render(
    <Router navigator={history} location={history.location}>
      <Signup
        validation={validationStub}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );

  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock,
  };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  Helper.populateField(sut, "name", name);
  Helper.populateField(sut, "email", email);
  Helper.populateField(sut, "password", password);
  Helper.populateField(sut, "passwordConfirmation", password);
  const form = sut.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe("SignUp Component", () => {
  // após cada teste limpar
  afterEach(cleanup);

  it("Should start with initial state", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.testChildCount(sut, "error-wrap", 0);
    Helper.testButtonIsDisabled(sut, "submit", true);
    Helper.testStatusForField(sut, "name", validationError);
    Helper.testStatusForField(sut, "email", validationError);
    Helper.testStatusForField(sut, "password", validationError);
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);
  });

  it("Should show name error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "name");
    Helper.testStatusForField(sut, "name", validationError);
  });

  it("Should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateField(sut, "email");
    Helper.testStatusForField(sut, "email", validationError);
  });

  it("Should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateField(sut, "password");
    Helper.testStatusForField(sut, "password", validationError);
  });

  it("Should show passwordConfirmation error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateField(sut, "passwordConfirmation");
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);
  });

  it("Should show valid name state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "name");
    Helper.testStatusForField(sut, "name");
  });

  it("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "email");
    Helper.testStatusForField(sut, "email");
  });

  it("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "password");
    Helper.testStatusForField(sut, "password");
  });

  it("Should show valid passwordConfirmation state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "passwordConfirmation");
    Helper.testStatusForField(sut, "passwordConfirmation");
  });

  it("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "name");
    Helper.populateField(sut, "email");
    Helper.populateField(sut, "password");
    Helper.populateField(sut, "passwordConfirmation");

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it("Should show spinner on submit", async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  it("Should call AddAccount with correct values", async () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, name, email, password);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  it("Should call Authentication only once", async () => {
    const { sut, addAccountSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(addAccountSpy.callsCount).toEqual(1);
  });

  it("Should not call Authentication if form is invalid", () => {
    const validationError = faker.random.words();
    const { sut, addAccountSpy } = makeSut({ validationError });
    Helper.populateField(sut, "email");

    fireEvent.submit(sut.getByTestId("form"));

    expect(addAccountSpy.callsCount).toEqual(0);
  });

  // it("Should present error if Authentication fails", async () => {
  //   const { sut, addAccountSpy } = makeSut();
  //   const error = new EmailInUseError();
  //   jest
  //     .spyOn(addAccountSpy, "add").mockRejectedValueOnce(error)
  //   await simulateValidSubmit(sut);

  //   const errorWrap = sut.getByTestId("error-wrap");
  //   await waitFor(() => errorWrap)
  //   const mainError = sut.getByTestId("main-error");
  //   expect(mainError.textContent).toBe(error.message);
  //   expect(errorWrap.childElementCount).toBe(1);
  // });

  it("Should call saveAccessToken on success", async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut();

    await simulateValidSubmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(
      addAccountSpy.account.accessToken
    );
    expect(history.location.pathname).toBe("/");
  });

  it("Should go login page", () => {
    const { sut } = makeSut();
    const loginLink = sut.getByTestId("login");
    fireEvent.click(loginLink);

    expect(history.location.pathname).toBe("/login");
  });
});
