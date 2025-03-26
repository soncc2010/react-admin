import { removeToken, removeRefreshToken } from 'utils/cookies';
import { AuthState, AuthActions } from './types';

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: User) => set(() => ({ userInfo })),
  logout: () => {
    set(() => ({ userInfo: null }));
    removeToken();
    removeRefreshToken();
  },
}));

export default useAuthStore;
