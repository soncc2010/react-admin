import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setToken = (tokenValue: string): void => {
  cookies.set('token', tokenValue, { path: '/' });
};

export const getToken = (): string | undefined => cookies.get('token');

export const removeToken = (): void => {
  cookies.remove('token', { path: '/' });
};

export const setRefreshToken = (tokenValue: string): void => {
  cookies.set('refreshToken', tokenValue, { path: '/' });
};

export const getRefreshToken = (): string | undefined =>
  cookies.get('refreshToken');

export const removeRefreshToken = (): void => {
  cookies.remove('refreshToken', { path: '/' });
};
