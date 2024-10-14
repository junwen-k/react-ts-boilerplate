import { Cookies } from 'react-cookie';

export const ACCESS_TOKEN_COOKIE_NAME = 'app.accessToken';

export const REFRESH_TOKEN_COOKIE_NAME = 'app.refreshToken';

const cookies = new Cookies();

export const getAccessToken = () => cookies.get(ACCESS_TOKEN_COOKIE_NAME) ?? '';

export const getRefreshToken = () =>
  cookies.get(REFRESH_TOKEN_COOKIE_NAME) ?? '';
