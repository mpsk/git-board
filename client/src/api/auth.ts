import { Host } from 'src/config/hosts';

const OAUTH_COOKIE = 'oauth_code';

const getGithubConfig = () => ({
  client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
  // scope: 'read:user',
  // state: JSON.stringify(state),
  // allow_signup: 'true',
});

const generateGetParams = (params: object) =>
  Object.entries(params)
    .map(kv => kv.map(encodeURIComponent).join('='))
    .join('&');

export const auth = {
  authorize: () => {
    const redirectUrl = `${Host.GitHostAuth}?${generateGetParams(getGithubConfig())}`;
    window.location.assign(redirectUrl);
  },
  logout: () => {
    auth.destroy();
    window.location.assign(window.location.origin);
  },
  destroy: () => localStorage.removeItem(OAUTH_COOKIE),
  setAccessToken: (value: string) => localStorage.setItem(OAUTH_COOKIE, value),
  getAccessToken: () => localStorage.getItem(OAUTH_COOKIE) || '',
};
