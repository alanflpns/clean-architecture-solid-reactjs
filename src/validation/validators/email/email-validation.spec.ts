import { InvalidFieldError } from "../../errors/invalid-field-error";
import { EmailValidation } from "./email-validation";
import faker from "faker";

const makeSut = (field: string) => new EmailValidation(field);

describe("EmailValidation", () => {
  it("Should return error if email is invalid", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toEqual(new InvalidFieldError());
  });

  it("Should return falsy if email is valid", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.internet.email() });
    expect(error).toBeFalsy();
  });

  it("Should return falsy if email is empty", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: "" });
    expect(error).toBeFalsy();
  });
});
