import { MatchFieldValidator } from 'validators/index';
import { VALIDATOR_TYPES } from 'constants/main.constants';

describe('MatchFieldValidator tests', () => {
  describe('Without optional params', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
    test.each`
      value              | values                                | succeeded | message                          | field
      ${'nya@gmail.com'} | ${{ repeatEmail: 'nya@gmail.com' }}   | ${true}   | ${''}                            | ${'repeatEmail'}
      ${'nya@gmail.com'} | ${{ repeatEmail: 'nya@hotmail.com' }} | ${false}  | ${VALIDATOR_TYPES.MATCH.MESSAGE} | ${'repeatEmail'}
      ${''}              | ${{ repeatEmail: '' }}                | ${true}   | ${''}                            | ${'repeatEmail'}
      ${'password'}      | ${{ repeatPassword: 'password' }}     | ${true}   | ${''}                            | ${'repeatPassword'}
      ${'pass'}          | ${{ repeatPassword: 'password' }}     | ${false}  | ${VALIDATOR_TYPES.MATCH.MESSAGE} | ${'repeatPassword'}
      ${undefined}       | ${{ repeatUndefined: undefined }}     | ${true}   | ${''}                            | ${'repeatUndefined'}
      ${null}            | ${{ repeatNull: null }}               | ${true}   | ${''}                            | ${'repeatNull'}
      ${0}               | ${{ repeatZero: 0 }}                  | ${true}   | ${''}                            | ${'repeatZero'}
      ${'something'}     | ${{ repeat: 0 }}                      | ${false}  | ${VALIDATOR_TYPES.MATCH.MESSAGE} | ${''}
    `(
      'Should return $succeeded with $value value, $values values and $field field',
      async ({ value, values, succeeded, message, field }) => {
        const validationResult = await MatchFieldValidator({
          value,
          values,
          customArgs: { field }
        });
        expect(validationResult.succeeded).toBe(succeeded);
        expect(validationResult.message).toBe(message);
        expect(validationResult.type).toBe(VALIDATOR_TYPES.MATCH.TYPE);
      }
    );
  });

  describe('With optional message param', () => {
    it('Should fail with empty string and return custom error message', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ login: false }));

      const args = {
        value: 'password',
        values: { password: 'pass' },
        customArgs: { field: 'password' },
        message: 'Custom error message'
      };

      const validationResult = await MatchFieldValidator(args);
      expect(validationResult.succeeded).toBeFalsy;
      expect(validationResult.message).toBe(args.message);
      expect(validationResult.type).toBe(VALIDATOR_TYPES.MATCH.TYPE);
    });
  });
});
