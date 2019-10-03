import { VALIDATOR_TYPES } from 'constants/main.constants';
import { ValidationResult } from '@lemoncode/fonk/typings/model';

export const MatchFieldValidator = (fieldValidatorArgs): ValidationResult => {
  const {
    value,
    values,
    message,
    customArgs: { field } = { field: '' }
  } = fieldValidatorArgs;

  const validationResult = {
    succeeded: false,
    type: VALIDATOR_TYPES.MATCH.TYPE,
    message: message || VALIDATOR_TYPES.MATCH.MESSAGE
  };

  const compare = values[field];
  if (value === compare) {
    validationResult.succeeded = true;
    validationResult.message = '';
  }
  return validationResult;
};
