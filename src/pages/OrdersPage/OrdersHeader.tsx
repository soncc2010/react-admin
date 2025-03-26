const OrdersHeader: FC = () => {
  const { t } = useTranslation();

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      path: '/',
      title: t('dashboard'),
    },
    {
      title: t('orders'),
    },
  ];

  return (
    <AntFlex vertical={true} gap={16}>
      <AntRow align="bottom">
        <AntCol flex="auto">
          <Breadcrumb title={t('orders')} items={breadcrumbItems} />
        </AntCol>
        <AntCol flex="none">
          <AntButton type="primary" icon={<ExportIcon />}>
            {t('export')}
          </AntButton>
        </AntCol>
      </AntRow>
    </AntFlex>
  );
};

export default OrdersHeader;
