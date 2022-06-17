/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import Input from "./input";
import Context from "../../contexts/form/form-contex";

describe("Input Component", () => {
  it("Shold begin with readOnly", () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    );
    const input = getByTestId("field") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
