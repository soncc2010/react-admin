export const getProducts = (): Promise<Product[]> =>
  apiRequest({
    url: 'products',
  });

export const getProductDetail = (id: string): Promise<Product> =>
  apiRequest({
    url: `products/${id}`,
  });

export const createProduct = (data: ProductFormData): Promise<void> =>
  apiRequest({
    url: 'products',
    method: 'post',
    data,
  });

export const editProduct = (id: string, data: ProductFormData): Promise<void> =>
  apiRequest({
    url: `products/${id}`,
    method: 'put',
    data,
  });

export const deleteProduct = (id: string): Promise<void> =>
  apiRequest({
    url: `products/${id}`,
    method: 'delete',
  });
