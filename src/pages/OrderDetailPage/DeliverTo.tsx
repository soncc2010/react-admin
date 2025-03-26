type DeliverToProps = {
  address: Address;
};

const DeliverTo: FC<DeliverToProps> = ({ address }) => {
  const { t } = useTranslation();

  const borderedItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('street'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: address.street,
    },
    {
      key: '2',
      label: t('city'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: address.city,
    },
    {
      key: '3',
      label: t('country'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: address.country,
    },
  ];
  return (
    <AntCard>
      <AntDescriptions
        bordered
        title={t('deliver_to')}
        size="small"
        items={borderedItems}
      />
    </AntCard>
  );
};

export default DeliverTo;
