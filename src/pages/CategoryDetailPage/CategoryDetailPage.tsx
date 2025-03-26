import { RoutePathEnum } from 'enums/app';
import useCategoryDetail from './use-category-detail';

const CategoryDetailPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    breadcrumbItems,
    control,
    register,
    isLoading,
    isSubmitting,
    handleSubmit,
    onSubmit,
  } = useCategoryDetail();

  return (
    <AntFlex gap={16} vertical>
      <Breadcrumb title={t('categories')} items={breadcrumbItems} />
      <AntCard>
        <AntForm
          name="categoryForm"
          autoComplete="off"
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <Input
            name="name"
            label={t('name')}
            control={control}
            register={register}
          />
          <Upload control={control} name="image" limit={1} />
          <AntSpace>
            <AntButton
              type="default"
              icon={<XIcon />}
              disabled={isLoading || isSubmitting}
              onClick={() => navigate(RoutePathEnum.Categories)}
            >
              {t('cancel')}
            </AntButton>
            <AntButton
              type="primary"
              htmlType="submit"
              icon={<FloppyDiskIcon />}
              disabled={isLoading}
              loading={isSubmitting}
            >
              {t('save')}
            </AntButton>
          </AntSpace>
        </AntForm>
      </AntCard>
    </AntFlex>
  );
};

export default CategoryDetailPage;
