import { PAYMENT_METHOD_LABELS, SHIPPING_METHOD_LABELS } from 'constants/order';

type OrderSummaryProps = {
  data: Order;
};

const OrderSummary: FC<OrderSummaryProps> = ({ data }) => {
  const { t } = useTranslation();

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('order_date'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: formatDate(data.orderDate),
    },
    {
      key: '2',
      label: t('payment_method'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: t(PAYMENT_METHOD_LABELS[data.paymentMethod]),
    },
    {
      key: '3',
      label: t('shipping_method'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: t(SHIPPING_METHOD_LABELS[data.shippingMethod]),
    },
  ];

  return (
    <AntCard>
      <AntDescriptions
        bordered
        title={t('order_summary')}
        size="small"
        items={items}
      />
    </AntCard>
  );
};

export default OrderSummary;
