type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  creationAt: Date;
  updatedAt: Date;
  image?: string;
  description?: string;
  category: Category;
  images?: string[];
};

type ProductFormData = {
  title: string;
  price: number;
  categoryId: number;
  description: string;
  images?: string[];
};
