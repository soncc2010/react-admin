const CategoriesHeader: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      path: '/',
      title: t('dashboard'),
    },
    {
      title: t('categories'),
    },
  ];

  return (
    <AntFlex vertical={true} gap={16}>
      <AntRow align="bottom">
        <AntCol flex="auto">
          <Breadcrumb title={t('categories')} items={breadcrumbItems} />
        </AntCol>
        <AntCol flex="none">
          <AntButton
            type="primary"
            icon={<PlusIcon />}
            onClick={() => navigate('/categories/create')}
          >
            {t('create_category')}
          </AntButton>
        </AntCol>
      </AntRow>
    </AntFlex>
  );
};

export default CategoriesHeader;
