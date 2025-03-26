const Statistics: FC = () => {
  const { t } = useTranslation();

  const items: OptionType[] = [
    {
      label: t('total_revenue'),
      value: formatCurrency(75500),
      icon: <MoneyIcon size={24} color="var(--color-blue)" />,
    },
    {
      label: t('total_sales'),
      value: formatNumber(1289),
      icon: <ShoppingCartIcon size={24} color="var(--color-green)" />,
    },
    {
      label: t('total_orders'),
      value: formatNumber(392),
      icon: <BasketIcon size={24} color="var(--color-red)" />,
    },
    {
      label: t('total_customers'),
      value: formatNumber(28032),
      icon: <IdentificationBadgeIcon size={24} color="var(--color-yellow)" />,
    },
  ];

  return (
    <AntRow gutter={[16, 16]}>
      {map(items, (item: OptionType, index: number) => (
        <AntCol key={index} span={24} md={{ flex: '50%' }} lg={{ flex: '25%' }}>
          <AntCard>
            {item.icon}
            <AntTypography.Paragraph
              type="secondary"
              style={{ marginBottom: 0 }}
            >
              {item.label}
            </AntTypography.Paragraph>
            <AntTypography.Title level={5} style={{ margin: 0 }}>
              {item.value}
            </AntTypography.Title>
          </AntCard>
        </AntCol>
      ))}
    </AntRow>
  );
};

export default Statistics;
