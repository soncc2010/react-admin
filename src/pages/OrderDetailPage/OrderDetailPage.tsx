import DeliverTo from './DeliverTo';
import OrderCustomerDetail from './OrderCustomerDetail';
import OrderDetail from './OrderDetail';
import OrderList from './OrderList';
import OrderSummary from './OrderSummary';
import useOrderDetail from './use-order-detail';

const OrderDetailPage: FC = () => {
  const { t } = useTranslation();
  const { isLoading, data, breadcrumbItems } = useOrderDetail();

  const renderContent = (): ReactElement => {
    if (isLoading) {
      return (
        <AntFlex flex="1" align="center" justify="center">
          <AntSpin />
        </AntFlex>
      );
    }

    if (!data) {
      return (
        <AntFlex flex="1" align="center" justify="center">
          {t('no_data')}
        </AntFlex>
      );
    }

    return (
      <>
        <OrderDetail data={data} />
        <AntRow gutter={[16, 16]}>
          <AntCol span={24} xl={{ flex: '50%' }} xxl={{ flex: '33.333%' }}>
            <OrderCustomerDetail customer={data.customer} />
          </AntCol>
          <AntCol span={24} xl={{ flex: '50%' }} xxl={{ flex: '33.333%' }}>
            <OrderSummary data={data} />
          </AntCol>
          <AntCol span={24} xl={{ flex: '100%' }} xxl={{ flex: '33.333%' }}>
            <DeliverTo address={data.customer.address} />
          </AntCol>
        </AntRow>
        <OrderList products={data.products} />
      </>
    );
  };

  return (
    <AntFlex gap={16} vertical style={{ minHeight: '100%' }}>
      <Head title={t('order_detail')} />
      <Breadcrumb title={t('categories')} items={breadcrumbItems} />
      {renderContent()}
    </AntFlex>
  );
};

export default OrderDetailPage;
