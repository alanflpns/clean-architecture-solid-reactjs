import {
  ValidationBuilder,
  ValidationComposite,
} from "../../../validation/validators";
import { makeSignUpValidation } from "./signup-validation-factory";

describe("LoginValidationFactory", () => {
  it("Should compose ValidationComposite with correct validations", () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("name").required().min(2).build(),
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().min(5).build(),
        ...ValidationBuilder.field("passwordConfirmation")
          .required()
          .min(5)
          .build(),
      ])
    );
  });
});
