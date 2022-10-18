import faker from "faker";
import { InvalidFieldError } from "../../errors/invalid-field-error";
import { CompareFieldsValidation } from "./compare-fields-validation";

const makeSut = (field: string, fieldToCompare: string) =>
  new CompareFieldsValidation(field, fieldToCompare);

describe("CompareFieldsValidation", () => {
  const field = faker.database.column();
  const fieldToCompare = faker.database.column();
  it("Should return error if compare is invalid", () => {
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word(),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  it("Should return falsy if compare is invalid", () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();

    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
