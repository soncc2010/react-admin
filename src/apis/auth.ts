export const login = (data: UserLogin): Promise<UserLoginResponse> =>
  apiRequest({
    url: 'auth/login',
    method: 'post',
    data,
  });

export const getUserInfo = (): Promise<User> =>
  apiRequest({
    url: 'auth/profile',
  });
