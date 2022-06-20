/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import faker from "faker";
import { fireEvent, render } from "@testing-library/react";
import Input from "./input";
import Context from "../../contexts/form/form-contex";

const makeSut = (filedName: string) => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={filedName} />
    </Context.Provider>
  );
};

describe("Input Component", () => {
  it("Shold begin with readOnly", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it("Shold remove readOnly on focus", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});
