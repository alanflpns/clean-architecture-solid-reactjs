import { InvalidFieldError } from "../../errors/invalid-field-error";
import { FieldValidation } from "../../protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(value: string): Error | null {
    return new InvalidFieldError();
  }
}
