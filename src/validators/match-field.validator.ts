import { VALIDATOR_TYPES } from "constants/main.constants";
import { ValidationResult } from '@lemoncode/fonk/typings/model';

export const MatchFieldValidator = (fieldValidatorArgs): ValidationResult => {
  const { value, values, customArgs } = fieldValidatorArgs;
    const validationResult = {
      succeeded: false,
      type: VALIDATOR_TYPES.MATCH.TYPE,
      message: VALIDATOR_TYPES.MATCH.MESSAGE,
    };
  if (value === values[customArgs['field']]) {
    validationResult.succeeded = true;
    validationResult.message = '';
  }
  return validationResult;
}