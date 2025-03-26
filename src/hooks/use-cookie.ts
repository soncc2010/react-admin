import Cookies from 'universal-cookie';

type UseCookie = {
  getAccessToken: () => string | undefined;
  setAccessToken: (token: string) => void;
  revokeToken: () => void;
  isAuthenticated: () => boolean;
};

const useCookie = (): UseCookie => {
  const cookies = new Cookies();

  const getAccessToken = (): string => {
    return cookies.get('token');
  };

  const setAccessToken = (token: string): void => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    cookies.set('token', token, { path: '/', expires });
  };

  const revokeToken = () => {
    cookies.remove('token', { path: '/' });
  };

  const isAuthenticated = (): boolean => !!getAccessToken();

  return { getAccessToken, setAccessToken, revokeToken, isAuthenticated };
};

export default useCookie;
