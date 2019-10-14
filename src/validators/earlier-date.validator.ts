import {
  FieldValidationFunctionSync,
  ValidationResult,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE: string = 'EARLIER_DATE';
const defaultMessage: string = 'Date is not earlier than date provided';
const BAD_PARAMETER: string =
  'Parameter "date" for earlierDate is mandatory and should be a valid Date object.';
const BAD_PARAMETER_CUSTOM: string =
  'Parameter "date" for earlierDate in customArgs is mandatory and should be a valid Date object. Example: { date: new Date() }';

export const EarlierDateValidator = (fieldValidatorArgs): ValidationResult => {
  const { value, message, customArgs } = fieldValidatorArgs;
  const { date } = customArgs;

  if (!(value instanceof Date)) {
    throw new TypeError(BAD_PARAMETER);
  }

  if (!date || !(date instanceof Date)) {
    throw new TypeError(BAD_PARAMETER_CUSTOM);
  }

  const validationResult: ValidationResult = {
    succeeded: false,
    type: VALIDATOR_TYPE,
    message: parseMessageWithCustomArgs(message as string, customArgs) || defaultMessage,
  };

  if (value < date) {
    validationResult.succeeded = true;
    validationResult.message = '';
  }
  return validationResult;
};
