import { deleteUser, getUsers } from 'apis/user';

type UseUserReturn = {
  openModal: {
    edit: boolean;
    delete: boolean;
  };
  selectedUser: User | null;
  users: User[];
  pagination: TablePaginationConfig;
  searchText: string;
  isLoading: boolean;
  isLoadingDelete: boolean;
  setOpenModal: React.Dispatch<
    React.SetStateAction<{
      edit: boolean;
      delete: boolean;
    }>
  >;
  refetch: () => void;
  handleEditUser: (user: User) => void;
  handleEditUserSuccess: () => void;
  handleDeleteConfirm: (user: User) => void;
  handleDeleteUser: () => void;
  handleTableChange: (newPagination: TablePaginationConfig) => void;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const useUser = (): UseUserReturn => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState<{
    edit: boolean;
    delete: boolean;
  }>({
    edit: false,
    delete: false,
  });
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
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
    queryKey: ['users'],
    queryFn: getUsers,
  });

  useEffect(() => {
    setPagination({
      ...pagination,
      total: size(data),
    });

    setUsers(data);
  }, [data]);

  const handleEditUser = (user: User): void => {
    setSelectedUser(user);
    setOpenModal({
      ...openModal,
      edit: true,
    });
  };

  const handleEditUserSuccess = (): void => {
    setSelectedUser(null);
    setOpenModal({
      ...openModal,
      edit: false,
    });
    refetch();
  };

  const handleDeleteConfirm = (user: User): void => {
    setSelectedUser(user);
    setOpenModal({
      ...openModal,
      delete: true,
    });
  };

  const handleResetPagination = (): void => {
    setPagination({
      ...pagination,
      current: 1,
      pageSize: 10,
    });
  };

  const handleDeleteUser = async (): Promise<void> => {
    try {
      setIsLoadingDelete(true);
      await deleteUser(get(selectedUser, 'id'));
      showSuccess(t('delete_user_success'));
      setOpenModal({
        ...openModal,
        delete: false,
      });
      handleResetPagination();
      refetch();
    } catch (error) {
      showError(get(error, 'message'));
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig): void => {
    setPagination(newPagination);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
    setUsers(
      filter(data, (user: User) =>
        includes(lowerCase(user.name), lowerCase(e.target.value)),
      ),
    );
    handleResetPagination();
  };

  return {
    openModal,
    selectedUser,
    users,
    pagination,
    searchText,
    isLoading,
    isLoadingDelete,
    setOpenModal,
    refetch,
    handleEditUser,
    handleEditUserSuccess,
    handleDeleteConfirm,
    handleDeleteUser,
    handleTableChange,
    handleSearch,
  };
};

export default useUser;
