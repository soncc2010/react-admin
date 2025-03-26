import { mockOrders } from './mock-data';

type UseOrder = {
  selectedOrder: Order | null;
  orders: Order[];
  isLoading: boolean;
  isLoadingDelete: boolean;
  openConfirmModal: boolean;
  pagination: TablePaginationConfig;
  searchText: string;
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteConfirm: (user: Order) => void;
  handleDeleteOrder: () => Promise<void>;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTableChange: (newPagination: TablePaginationConfig) => void;
};

export const useOrders = (): UseOrder => {
  const { t } = useTranslation();
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
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
    queryKey: ['orders'],
    queryFn: () => {
      // TODO: Integrate API
      return mockOrders;
    },
  });

  useEffect(() => {
    setPagination({
      ...pagination,
      total: size(data),
    });

    setOrders(data);
  }, [data]);

  const handleDeleteConfirm = (user: Order): void => {
    setSelectedOrder(user);
    setOpenConfirmModal(true);
  };

  const handleDeleteOrder = async (): Promise<void> => {
    try {
      setIsLoadingDelete(true);
      // TODO: Integrate API
      refetch();
      showSuccess(t('delete_order_success'));
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
    // TODO: Integrate API
    handleResetPagination();
  };

  return {
    selectedOrder,
    orders,
    searchText,
    pagination,
    isLoading,
    isLoadingDelete,
    openConfirmModal,
    setOpenConfirmModal,
    handleDeleteConfirm,
    handleSearch,
    handleTableChange,
    handleDeleteOrder,
  };
};

export default useOrders;
