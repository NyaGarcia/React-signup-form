import { VALIDATOR_TYPES } from "constants/main.constants";
import { isGithubAccount } from "pods/signup/index";
import { ValidationResult } from '@lemoncode/fonk';

export const GithubIdValidator = async (fieldValidatorArgs): Promise<ValidationResult> => {
  const { value } = fieldValidatorArgs;

  const isValid = await isGithubAccount(value);

  const validationResult = {
    succeeded: false,
    type: VALIDATOR_TYPES.GITHUB_ID.TYPE,
    message: VALIDATOR_TYPES.GITHUB_ID.MESSAGE,
  };

  if (isValid) {
    validationResult.succeeded = true;
    validationResult.message = '';
  }
  return validationResult;
}