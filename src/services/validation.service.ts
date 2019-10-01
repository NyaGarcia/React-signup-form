import { Validators, createFormValidation, ValidationSchema, FormValidationResult } from '@lemoncode/fonk';
import { PASSWORD_REGEXP } from "constants/main.constants";
import  {MatchFieldValidator, GithubIdValidator} from "validators";
  
  const validationSchema = {
      field: {
        id: [Validators.required.validator, {
          validator: GithubIdValidator
        }],
        firstName: [Validators.required.validator],
        lastName: [Validators.required.validator],
        email: [Validators.email.validator, Validators.required.validator],
        repeatEmail: [Validators.required.validator, {
          validator: MatchFieldValidator,
          customArgs: {field: 'email'}
        }],
        password: [Validators.required.validator, {
          validator: Validators.pattern.validator,
          customArgs: {pattern: new RegExp(PASSWORD_REGEXP)}
        }],
        repeatPassword: [Validators.required.validator, {
          validator: MatchFieldValidator,
          customArgs: {field: 'password'}
        }]
      }
    }

  const formValidation = createFormValidation(validationSchema);

  export const validateForm = async (formValues): Promise<FormValidationResult> => {
    return formValidation.validateForm(formValues);
  }
  
