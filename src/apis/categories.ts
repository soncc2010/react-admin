export const getCategories = (): Promise<Category[]> =>
  apiRequest({
    url: 'categories',
  });

export const getDetailCategory = (id: string): Promise<Category> =>
  apiRequest({
    url: `categories/${id}`,
  });

export const createCategory = (data: CategoryFormData): Promise<void> =>
  apiRequest({
    url: 'categories',
    method: 'post',
    data,
  });

export const editCategory = (
  id: string,
  data: CategoryFormData,
): Promise<void> =>
  apiRequest({
    url: `categories/${id}`,
    method: 'put',
    data,
  });

export const deleteCategory = (id: string): Promise<void> =>
  apiRequest({
    url: `categories/${id}`,
    method: 'delete',
  });
