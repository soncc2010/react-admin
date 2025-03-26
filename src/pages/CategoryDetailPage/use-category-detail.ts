import {
  createCategory,
  editCategory,
  getDetailCategory,
} from 'apis/categories';
import { RoutePathEnum } from 'enums/app';

const useCategoryDetail = (): {
  isSubmitting: boolean;
  isLoading: boolean;
  breadcrumbItems: BreadcrumbItemType[];
  control: Control<CategoryFormData>;
  register: UseFormRegister<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => void;
  handleSubmit: UseFormHandleSubmit<CategoryFormData>;
} => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError } = useToast();
  const { showSuccess } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      path: RoutePathEnum.Dashboard,
      title: t('dashboard'),
    },
    {
      path: RoutePathEnum.Categories,
      title: t('categories'),
    },
    {
      title: id ? t('edit_category') : t('create_category'),
    },
  ];

  const schema = z.object({
    name: z.string().nonempty(t('field_required', { field: t('name') })),
    image: z.string().optional(),
  });

  const { control, handleSubmit, reset, register } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      image:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['categoryDetail', id],
    queryFn: () => getDetailCategory(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (id && data) {
      console.log(data);
      reset(data);
    }
  }, [id, data, reset]);

  const handleCreateCategory = async (data: CategoryFormData) => {
    try {
      setIsSubmitting(true);
      await createCategory(data);
      reset();
      showSuccess(t('create_category_success'));
      navigate(RoutePathEnum.Categories);
    } catch (error) {
      showError(get(error, 'message'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCategory = async (data: CategoryFormData) => {
    try {
      setIsSubmitting(true);
      await editCategory(id as string, data);
      reset();
      showSuccess(t('edit_category_success'));
      navigate(RoutePathEnum.Categories);
    } catch (error) {
      showError(get(error, 'message'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data: CategoryFormData): void => {
    id ? handleEditCategory(data) : handleCreateCategory(data);
  };

  return {
    isSubmitting,
    isLoading,
    breadcrumbItems,
    control,
    register,
    onSubmit,
    handleSubmit,
  };
};

export default useCategoryDetail;
