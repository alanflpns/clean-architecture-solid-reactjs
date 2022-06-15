import { InvalidFieldError } from "../../errors/invalid-field-error";
import { MinLengthValidation } from "./min-length-validation";

const makeSut = () => new MinLengthValidation("field", 5);

describe("MinLengthValidation", () => {
  it("Should return error if value is invalid", () => {
    const sut = makeSut();
    const error = sut.validate("123");
    expect(error).toEqual(new InvalidFieldError());
  });
});
