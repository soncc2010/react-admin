export type AuthState = {
  userInfo: User | null;
};

export type AuthActions = {
  setUserInfo: (data: User) => void;
  logout: () => void;
};

export type SetState<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined,
  actionName?: string,
) => void;
