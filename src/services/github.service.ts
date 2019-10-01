import { GITHUB_ENDPOINT } from 'constants/main.constants';
   const get = (endpoint: string): Promise<Response> => {
   return fetch(endpoint).then(response => response.json());
  }

  export const isGithubAccount = async (username: string): Promise<Boolean> => {
    const response = await get(`${GITHUB_ENDPOINT}/${username}`);
    return response['login'];
  }
