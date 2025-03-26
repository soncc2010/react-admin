import { getCategories, deleteCategory } from 'apis/categories';
import CategoriesHeader from './CategoriesHeader';

const ConfirmModal = lazy(() => import('modals/ConfirmModal'));

const CategoriesPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState<string>('');
  const { showError, showSuccess } = useToast();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  useEffect(() => {
    setPagination({
      ...pagination,
      total: size(data),
    });

    setCategories(data);
  }, [data]);

  const handleDeleteConfirm = (user: Category): void => {
    setSelectedCategory(user);
    setOpenConfirmModal(true);
  };

  const handleDeleteCategory = async (): Promise<void> => {
    try {
      setIsLoadingDelete(true);
      await deleteCategory(get(selectedCategory, 'id'));
      refetch();
      showSuccess(t('delete_category_success'));
      setOpenConfirmModal(false);
      handleResetPagination();
    } catch (error) {
      showError(get(error, 'message'));
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const columns: TableProps<Category>['columns'] = [
    {
      title: t('image'),
      dataIndex: 'image',
      key: 'image',
      render: (image) => <AntAvatar src={image} />,
      width: 80,
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('createdAt'),
      dataIndex: 'creationAt',
      key: 'creationAt',
      width: 180,
      render: (date) => formatDate(date),
    },
    {
      title: t('updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (date) => formatDate(date),
    },
    {
      title: t('action'),
      width: 80,
      render: (_, category) => (
        <AntSpace>
          <AntButton
            type="primary"
            size="small"
            icon={<PencilIcon />}
            onClick={() => navigate(`/categories/${category.id}`)}
          />
          <AntButton
            type="primary"
            danger
            size="small"
            icon={<TrashIcon />}
            onClick={() => handleDeleteConfirm(category)}
          />
        </AntSpace>
      ),
    },
  ];

  const handleResetPagination = (): void => {
    setPagination({
      ...pagination,
      current: 1,
      pageSize: 10,
    });
  };

  const handleTableChange = (newPagination: TablePaginationConfig): void => {
    setPagination(newPagination);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
    setCategories(
      filter(data, (category: Category) =>
        includes(lowerCase(category.name), lowerCase(e.target.value)),
      ),
    );
    handleResetPagination();
  };

  return (
    <AntFlex vertical={true} gap={16}>
      <Head title={t('categories')} />
      <CategoriesHeader />
      <AntSpace>
        <AntInput
          placeholder={t('searchUser')}
          value={searchText}
          onChange={handleSearch}
          prefix={<MagnifyingGlassIcon color="var(--color-black-500)" />}
        />
      </AntSpace>
      <AntTable<Category>
        columns={columns}
        dataSource={categories}
        pagination={pagination}
        loading={isLoading}
        bordered
        scroll={{ y: 'calc(100vh - 370px)', x: 'max-content' }}
        onChange={handleTableChange}
      />
      {openConfirmModal && (
        <ConfirmModal
          title={t('delete_category')}
          open={openConfirmModal}
          loading={isLoadingDelete}
          content={
            <Trans
              i18nKey="delete_confirm"
              values={{ name: get(selectedCategory, 'name') }}
              components={[<AntTypography.Text strong />]}
            />
          }
          onCancel={() => setOpenConfirmModal(false)}
          onAccept={handleDeleteCategory}
        />
      )}
    </AntFlex>
  );
};

export default CategoriesPage;
