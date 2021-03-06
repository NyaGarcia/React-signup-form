import { GITHUB_ENDPOINT } from 'constants/main.constants';
import { isGithubAccount } from 'pods/signup/github.service';

describe('isGithubAccount function tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it.each`
    username       | result
    ${'NyaGarcia'} | ${true}
    ${'username'}  | ${true}
    ${'unknown'}   | ${false}
    ${''}          | ${false}
    ${0}           | ${false}
    ${undefined}   | ${false}
    ${null}        | ${false}
  `('Should return Promise<$result> with $username value', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ login: '$result' }));

    const response = await isGithubAccount(`${GITHUB_ENDPOINT}/$result`);
    expect(response).toEqual('$result');
  });
});
