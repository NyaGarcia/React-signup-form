import { GITHUB_ENDPOINT } from 'constants/main.constants';

  export const isGithubAccount = async (username: string): Promise<Boolean> => {
    const response = await fetch(`${GITHUB_ENDPOINT}/${username}`);
    const parsedResponse = await response.json();
    return parsedResponse['login'];
  }
