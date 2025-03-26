const CategoriesHeader: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      path: '/',
      title: t('dashboard'),
    },
    {
      title: t('products'),
    },
  ];

  return (
    <AntFlex vertical={true} gap={16}>
      <AntRow align="bottom">
        <AntCol flex="auto">
          <Breadcrumb title={t('products')} items={breadcrumbItems} />
        </AntCol>
        <AntCol flex="none">
          <AntButton
            type="primary"
            icon={<PlusIcon />}
            onClick={() => navigate('/products/create')}
          >
            {t('create_product')}
          </AntButton>
        </AntCol>
      </AntRow>
    </AntFlex>
  );
};

export default CategoriesHeader;
