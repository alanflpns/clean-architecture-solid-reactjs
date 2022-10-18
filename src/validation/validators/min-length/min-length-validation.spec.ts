import faker from "faker";

import { InvalidFieldError } from "../../errors/invalid-field-error";
import { MinLengthValidation } from "./min-length-validation";

const makeSut = (field: string) => new MinLengthValidation(field, 5);

describe("MinLengthValidation", () => {
  it("Should return error if value is invalid", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) });
    expect(error).toEqual(new InvalidFieldError());
  });

  it("Should return falsy if value is valid", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) });
    expect(error).toBeFalsy();
  });

  it("Should return falsy if field does not exists in schema", () => {
    const sut = makeSut(faker.database.column());
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) });
    expect(error).toBeFalsy();
  });
});
