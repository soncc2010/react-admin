import { ORDER_STATUS_PROPERTIES } from 'constants/order';
import { RoutePathEnum } from 'enums/app';
import OrdersHeader from './OrdersHeader';
import useOrders from './use-orders';

const ConfirmModal = lazy(() => import('modals/ConfirmModal'));

const OrdersPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
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
  } = useOrders();

  const columns: TableProps<Order>['columns'] = [
    {
      title: t('order_id'),
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
    },
    {
      title: t('products'),
      dataIndex: 'products',
      key: 'products',
      render: (products) => {
        return (
          <AntSpace direction="vertical" style={{ gap: 0 }}>
            <AntTypography.Text>{head(products).title}</AntTypography.Text>
            {size(products) > 1 && (
              <AntTypography.Text type="secondary">
                {t('count_products', {
                  count: size(products) - 1,
                })}
              </AntTypography.Text>
            )}
          </AntSpace>
        );
      },
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => (
        <AntTag color={get(ORDER_STATUS_PROPERTIES, [status, 'color'])}>
          {t(get(ORDER_STATUS_PROPERTIES, [status, 'label']))}
        </AntTag>
      ),
    },
    {
      title: t('createdAt'),
      dataIndex: 'order_date',
      key: 'order_date',
      width: 180,
      render: (date) => formatDate(date),
    },
    {
      title: t('action'),
      width: 80,
      render: (_, order) => (
        <AntSpace>
          <AntButton
            type="primary"
            size="small"
            icon={<EyeIcon />}
            onClick={() => navigate(`${RoutePathEnum.Orders}/${order.orderId}`)}
          />
          <AntButton
            type="primary"
            danger
            size="small"
            icon={<TrashIcon />}
            onClick={() => handleDeleteConfirm(order)}
          />
        </AntSpace>
      ),
    },
  ];

  return (
    <AntFlex vertical={true} gap={16}>
      <Head title={t('orders')} />
      <OrdersHeader />
      <AntSpace>
        <AntInput
          placeholder={t('search_order')}
          value={searchText}
          onChange={handleSearch}
          prefix={<MagnifyingGlassIcon color="var(--color-black-500)" />}
        />
      </AntSpace>
      <AntTable<Order>
        columns={columns}
        dataSource={orders}
        pagination={pagination}
        loading={isLoading}
        bordered
        scroll={{ y: 'calc(100vh - 370px)', x: 'max-content' }}
        onChange={handleTableChange}
      />
      {openConfirmModal && (
        <ConfirmModal
          title={t('delete_order')}
          open={openConfirmModal}
          loading={isLoadingDelete}
          content={
            <Trans
              i18nKey="delete_order_confirm"
              values={{ name: get(selectedOrder, 'orderId') }}
              components={[<AntTypography.Text strong />]}
            />
          }
          onCancel={() => setOpenConfirmModal(false)}
          onAccept={handleDeleteOrder}
        />
      )}
    </AntFlex>
  );
};

export default OrdersPage;
