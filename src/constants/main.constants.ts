export const PASSWORD_REGEXP = /^(?=.{5,}$)(?=.*?[a-zA-Z\d])(?=.*?[\d])(?=.*?[#_@$-])/;

export const GITHUB_ENDPOINT = "https://api.github.com/users";

export const VALIDATOR_TYPES = {
  MATCH: {
    TYPE: "MATCH_FIELD_VALIDATOR",
    MESSAGE: "Fields do not match"},
    GITHUB_ID: {
      TYPE: "GITHUB_ID_VALIDATOR",
      MESSAGE: "Not a valid GitHub ID"
    }
}