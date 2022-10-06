import faker from "faker";
import { InvalidFieldError } from "../../errors/invalid-field-error";
import { CompareFieldsValidation } from "./compare-fields-validation";

const makeSut = (valueToCompare: string) =>
  new CompareFieldsValidation(faker.database.column(), valueToCompare);

describe("CompareFieldsValidation", () => {
  it("Should return error if compare is invalid", () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  it("Should return falsy if compare is invalid", () => {
    const valueToCompare = faker.random.word();
    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
