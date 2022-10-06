import { InvalidFieldError } from "../../errors/invalid-field-error";
import { FieldValidation } from "../../protocols/field-validation";

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate(value: string) {
    return value !== this.valueToCompare ? new InvalidFieldError() : null;
  }
}
