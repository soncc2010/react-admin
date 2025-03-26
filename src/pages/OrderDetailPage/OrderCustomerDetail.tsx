type OrderCustomerDetailProps = {
  customer: Customer;
};

const OrderCustomerDetail: FC<OrderCustomerDetailProps> = ({ customer }) => {
  const { t } = useTranslation();

  const borderedItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('name'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: customer.name,
    },
    {
      key: '2',
      label: t('email'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: customer.email,
    },
    {
      key: '3',
      label: t('phone'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: customer.phone,
    },
  ];
  return (
    <AntCard>
      <AntDescriptions
        bordered
        title={t('custom_details')}
        size="small"
        items={borderedItems}
      />
    </AntCard>
  );
};

export default OrderCustomerDetail;
