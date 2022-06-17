import { FieldValidation } from "../protocols/field-validation";

export class FieldValidationSpy implements FieldValidation {
  constructor(readonly field: string) {}
  error: Error | null = null;

  validate(value: string): Error | null {
    return this.error;
  }
}
