import { EarlierDateValidator } from 'validators/index';

const VALIDATOR_TYPE: string = 'EARLIER_DATE';
const message = 'Date is not earlier than date provided';
const errorMessage =
  'Parameter "date" for earlierDate is mandatory and should be a valid Date object.';
const errorMessageCustom =
  'Parameter "date" for earlierDate in customArgs is mandatory and should be a valid Date object. Example: { date: new Date() }';

describe('EarlierDateValidator tests', () => {
  describe('Without optional params', () => {
    test.each`
      date                      | succeeded | message
      ${new Date(2018, 11, 24)} | ${true}   | ${''}
      ${new Date(2018, 12, 24)} | ${true}   | ${''}
      ${new Date(2019, 10, 31)} | ${false}  | ${message}
      ${new Date(2020, 12, 25)} | ${false}  | ${message}
    `('Should return $succeeded with $username value', ({ date, succeeded, message }) => {
      const validationResult = EarlierDateValidator({
        value: date,
        customArgs: { date: new Date() },
      });
      expect(validationResult.succeeded).toBe(succeeded);
      expect(validationResult.message).toBe(message);
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });
  });
  describe('Value Error cases', () => {
    test.each`
      date
      ${0}
      ${undefined}
      ${null}
      ${''}
      ${'String'}
      ${-1}
    `(`Should throw Error with message "${errorMessage}"`, ({ date }) => {
      expect(() =>
        EarlierDateValidator({
          value: date,
          customArgs: { date: new Date() },
        })
      ).toThrow(TypeError);
    });
  });
});
