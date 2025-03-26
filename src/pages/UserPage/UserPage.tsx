import { formatDate } from 'utils/date';
import useAuthStore from 'stores/auth';
import UserHeader from './UserHeader';
import useUser from './use-user';

const EditUserModal = lazy(() => import('modals/EditUserModal'));
const ConfirmModal = lazy(() => import('modals/ConfirmModal'));

const UserPage: FC = () => {
  const { t } = useTranslation();
  const { userInfo } = useAuthStore();

  const {
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
  } = useUser();

  const columns: TableProps<User>['columns'] = [
    {
      title: t('avatar'),
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <AntAvatar src={avatar} />,
      width: 80,
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      width: 180,
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
      render: (_, user) => (
        <AntSpace>
          <AntButton
            type="primary"
            size="small"
            icon={<PencilIcon />}
            onClick={() => handleEditUser(user)}
          />
          <AntButton
            type="primary"
            danger
            size="small"
            icon={<TrashIcon />}
            disabled={get(userInfo, 'id') === user.id}
            onClick={() => handleDeleteConfirm(user)}
          />
        </AntSpace>
      ),
    },
  ];

  return (
    <AntFlex vertical={true} gap={16}>
      <Head title={t('users')} />
      <UserHeader onSuccess={refetch} />
      <AntSpace>
        <AntInput
          placeholder={t('searchUser')}
          value={searchText}
          onChange={handleSearch}
          prefix={<MagnifyingGlassIcon color="var(--color-black-500)" />}
        />
      </AntSpace>
      <AntTable<User>
        columns={columns}
        dataSource={users}
        pagination={pagination}
        loading={isLoading}
        bordered
        scroll={{ y: 'calc(100vh - 370px)', x: 'max-content' }}
        onChange={handleTableChange}
      />
      {openModal.edit && selectedUser && (
        <EditUserModal
          open={openModal.edit}
          user={selectedUser}
          onCancel={() => setOpenModal({ ...openModal, edit: false })}
          onSuccess={handleEditUserSuccess}
        />
      )}
      {openModal.delete && (
        <ConfirmModal
          title={t('delete_user')}
          open={openModal.delete}
          loading={isLoadingDelete}
          content={
            <Trans
              i18nKey="delete_confirm"
              values={{ name: get(selectedUser, 'name') }}
              components={[<AntTypography.Text strong />]}
            />
          }
          onCancel={() => setOpenModal({ ...openModal, delete: false })}
          onAccept={handleDeleteUser}
        />
      )}
    </AntFlex>
  );
};

export default UserPage;
