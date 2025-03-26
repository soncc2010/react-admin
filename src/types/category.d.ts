type Category = {
  id: string;
  name: string;
  slug: string;
  creationAt: Date;
  updatedAt: Date;
  image?: string;
};

type CategoryFormData = {
  name: string;
  image?: string;
};
