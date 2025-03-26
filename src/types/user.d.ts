type User = {
  id: string;
  email: string;
  name: string;
  status: string;
  creationAt: Date;
  updatedAt: Date;
  avatar?: string;
};

type UserLogin = {
  email: string;
  password: string;
};

type UserLoginResponse = {
  token: string;
  refreshToken: string;
};

type CreateUser = {
  email: string;
  password: string;
  name: string;
  avatar?: string;
};

type EditUser = {
  email: string;
  name: string;
  avatar?: string;
};
