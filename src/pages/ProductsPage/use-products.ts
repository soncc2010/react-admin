import { getProducts, deleteProduct } from 'apis/products';

type UseProduct = {
  selectedProduct: Product | null;
  products: Product[];
  isLoading: boolean;
  isLoadingDelete: boolean;
  openConfirmModal: boolean;
  pagination: TablePaginationConfig;
  searchText: string;
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteConfirm: (user: Product) => void;
  handleDeleteProduct: () => Promise<void>;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTableChange: (newPagination: TablePaginationConfig) => void;
};

export const useProducts = (): UseProduct => {
  const { t } = useTranslation();
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
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
    queryKey: ['products'],
    queryFn: getProducts,
  });

  useEffect(() => {
    setPagination({
      ...pagination,
      total: size(data),
    });

    setProducts(data);
  }, [data]);

  const handleDeleteConfirm = (user: Product): void => {
    setSelectedProduct(user);
    setOpenConfirmModal(true);
  };

  const handleDeleteProduct = async (): Promise<void> => {
    try {
      setIsLoadingDelete(true);
      await deleteProduct(get(selectedProduct, 'id'));
      refetch();
      showSuccess(t('delete_product_success'));
      setOpenConfirmModal(false);
      handleResetPagination();
    } catch (error) {
      showError(get(error, 'message'));
    } finally {
      setIsLoadingDelete(false);
    }
  };

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
    setProducts(
      filter(data, (product: Product) =>
        includes(lowerCase(product.title), lowerCase(e.target.value)),
      ),
    );
    handleResetPagination();
  };

  return {
    selectedProduct,
    products,
    searchText,
    pagination,
    isLoading,
    isLoadingDelete,
    openConfirmModal,
    setOpenConfirmModal,
    handleDeleteConfirm,
    handleSearch,
    handleTableChange,
    handleDeleteProduct,
  };
};

export default useProducts;
