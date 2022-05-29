import { render, screen } from "@testing-library/react";
import Login from "./login";

describe("Login Component", () => {
  it("Should not render spinner and error on start", () => {
    render(<Login />);
    const errorWrap = screen.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });
});
