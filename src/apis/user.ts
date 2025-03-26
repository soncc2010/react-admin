export const getUsers = (): Promise<User[]> =>
  apiRequest({
    url: 'users',
  });

export const createUser = (data: CreateUser): Promise<void> =>
  apiRequest({
    url: 'users',
    method: 'post',
    data,
  });

export const editUser = (id: string, data: EditUser): Promise<void> =>
  apiRequest({
    url: `users/${id}`,
    method: 'put',
    data,
  });

export const deleteUser = (id: string): Promise<void> =>
  apiRequest({
    url: `users/${id}`,
    method: 'delete',
  });
