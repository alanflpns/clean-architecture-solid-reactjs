/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { RenderResult, render } from "@testing-library/react";
import Signup from "./signup";
import { Helper } from "../../test";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Signup />);

  return {
    sut,
  };
};

describe("SignUp Component", () => {
  it("Should start with initial state", () => {
    const validationError = "Campo obrigatório";
    const { sut } = makeSut();

    Helper.testChildCount(sut, "error-wrap", 0);
    Helper.testButtonIsDisabled(sut, "submit", true);
    Helper.testStatusForField(sut, "name", validationError);
    Helper.testStatusForField(sut, "email", validationError);
    Helper.testStatusForField(sut, "password", validationError);
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);
  });
});
