import { GithubIdValidator } from 'validators/index';
import { VALIDATOR_TYPES } from 'constants/main.constants';

describe('GithubIdValidator tests', () => {
  describe('Without optional params', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
    test.each`
      username       | succeeded | message
      ${'NyaGarcia'} | ${true}   | ${''}
      ${'username'}  | ${true}   | ${''}
      ${'unknown'}   | ${false}  | ${VALIDATOR_TYPES.GITHUB_ID.MESSAGE}
      ${''}          | ${false}  | ${VALIDATOR_TYPES.GITHUB_ID.MESSAGE}
      ${0}           | ${false}  | ${VALIDATOR_TYPES.GITHUB_ID.MESSAGE}
      ${undefined}   | ${false}  | ${VALIDATOR_TYPES.GITHUB_ID.MESSAGE}
      ${null}        | ${false}  | ${VALIDATOR_TYPES.GITHUB_ID.MESSAGE}
    `(
      'Should return $succeeded with $username value',
      async ({ username, succeeded, message }) => {
        fetchMock.mockResponseOnce(JSON.stringify({ login: succeeded }));

        const validationResult = await GithubIdValidator({ value: username });
        expect(validationResult.succeeded).toBe(succeeded);
        expect(validationResult.message).toBe(message);
        expect(validationResult.type).toBe(VALIDATOR_TYPES.GITHUB_ID.TYPE);
      }
    );
  });

  describe('With optional message param', () => {
    it('Should fail with empty string and return custom error message', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ login: false }));

      const args = {
        value: '',
        message: 'Custom error message'
      };

      const validationResult = await GithubIdValidator(args);
      expect(validationResult.succeeded).toBeFalsy;
      expect(validationResult.message).toBe(args.message);
      expect(validationResult.type).toBe(VALIDATOR_TYPES.GITHUB_ID.TYPE);
    });
  });
});
