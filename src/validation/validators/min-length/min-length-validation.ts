import { InvalidFieldError } from "../../errors/invalid-field-error";
import { FieldValidation } from "../../protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}
  validate(value: string): Error | null {
    return new InvalidFieldError();
  }
}
