import { RoutePathEnum } from 'enums/app';
import useProductDetail from './use-product-detail';

const ProductDetailPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    breadcrumbItems,
    control,
    isLoading,
    isSubmitting,
    categoryOptions,
    handleSubmit,
    onSubmit,
    register,
  } = useProductDetail();

  return (
    <AntFlex gap={16} vertical>
      <Breadcrumb title={t('products')} items={breadcrumbItems} />
      <AntCard>
        <AntForm
          name="categoryForm"
          autoComplete="off"
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <Input
            name="title"
            label={t('title')}
            control={control}
            placeholder={t('enter_title')}
            register={register}
          />
          <InputNumber
            control={control}
            name="price"
            label={t('price')}
            addonAfter="đ"
            placeholder={t('enter_price')}
            register={register}
          />
          <Select
            control={control}
            name="categoryId"
            label={t('category')}
            options={categoryOptions}
            placeholder={t('select_a_category')}
          />
          <Editor
            label={t('content')}
            control={control}
            name="description"
            placeholder={t('enter_content')}
            register={register}
          />
          <Upload control={control} name="images" />
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

export default ProductDetailPage;
