import { RequiredFieldValidation } from "../../validators/required-field/required-field-validation";
import { EmailValidation } from "../email/email-validation";
import { ValidationBuilder } from "./validation-builder";

describe("ValidationBuilder", () => {
  it("Should return RequiredFieldValidation", () => {
    const validations = ValidationBuilder.field("any_field").required().build();
    expect(validations).toEqual([new RequiredFieldValidation("any_field")]);
  });

  it("Should return EmailValidation", () => {
    const validations = ValidationBuilder.field("any_field").email().build();
    expect(validations).toEqual([new EmailValidation("any_field")]);
  });
});
