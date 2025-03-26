import { getCategories } from 'apis/categories';
import { createProduct, editProduct, getProductDetail } from 'apis/products';
import { RoutePathEnum } from 'enums/app';

const useProductDetail = (): {
  isSubmitting: boolean;
  isLoading: boolean;
  breadcrumbItems: BreadcrumbItemType[];
  categoryOptions: SelectProps['options'];
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  handleSubmit: UseFormHandleSubmit<ProductFormData>;
} => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<
    SelectProps['options']
  >([]);

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      path: RoutePathEnum.Dashboard,
      title: t('dashboard'),
    },
    {
      path: RoutePathEnum.Products,
      title: t('products'),
    },
    {
      title: id ? t('edit_product') : t('create_product'),
    },
  ];

  const schema = z.object({
    title: z.string().nonempty(t('field_required', { field: t('title') })),
    categoryId: z.number(),
    price: z
      .number()
      .min(0, { message: t('price_min') })
      .refine((value) => value > 0, {
        message: t('field_required', { field: t('price') }),
      }),
    description: z
      .string()
      .nonempty(t('field_required', { field: t('content') })),
    images: z.array(z.string()).optional(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail(id as string),
    enabled: !!id,
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (!isEmpty(id) && !isEmpty(data)) {
      reset({
        title: get(data, 'title'),
        price: get(data, 'price'),
        description: get(data, 'description'),
        categoryId: get(data, 'category.id'),
        images: get(data, 'images', []),
      });
    }
  }, [id, data]);

  useEffect(() => {
    if (categoriesQuery.data) {
      const options = map(categoriesQuery.data, (item: Category) => ({
        label: item.name,
        value: item.id,
      }));

      setCategoryOptions(options);
    }
  }, [categoriesQuery.data]);

  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      await createProduct(data);
      reset();
      showSuccess(t('create_product_success'));
      navigate(RoutePathEnum.Products);
    } catch (error) {
      showError(get(error, 'message'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      await editProduct(id as string, data);
      showSuccess(t('edit_product_success'));
      navigate(RoutePathEnum.Categories);
      reset();
    } catch (error) {
      showError(get(error, 'message'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data: ProductFormData): void => {
    id ? handleEditProduct(data) : handleCreateProduct(data);
  };

  return {
    isSubmitting,
    isLoading,
    breadcrumbItems,
    control,
    errors,
    categoryOptions,
    register,
    onSubmit,
    handleSubmit,
  };
};

export default useProductDetail;
