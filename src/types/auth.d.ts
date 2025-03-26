type UserAuthentication = {
  expireAt: number;
  token: string;
  user: User;
  refreshToken: string;
};
