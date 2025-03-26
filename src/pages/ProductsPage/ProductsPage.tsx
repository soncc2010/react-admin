import { RoutePathEnum } from 'src/enums/app';
import ProductsHeader from './ProductsHeader';
import useProducts from './use-products';

const ConfirmModal = lazy(() => import('modals/ConfirmModal'));

const ProductsPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    selectedProduct,
    products,
    searchText,
    pagination,
    isLoading,
    isLoadingDelete,
    openConfirmModal,
    setOpenConfirmModal,
    handleDeleteConfirm,
    handleSearch,
    handleTableChange,
    handleDeleteProduct,
  } = useProducts();

  const columns: TableProps<Product>['columns'] = [
    {
      title: t('image'),
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <AntAvatar.Group
          max={{
            count: 2,
          }}
        >
          {map(images, (image: String, index: number) => (
            <AntAvatar key={index} src={image} />
          ))}
        </AntAvatar.Group>
      ),
      width: 80,
    },
    {
      title: t('title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('category'),
      dataIndex: 'category',
      key: 'category',
      width: 180,
      render: (category) => category.name,
    },
    {
      title: t('createdAt'),
      dataIndex: 'creationAt',
      key: 'creationAt',
      width: 180,
      render: (date) => formatDate(date),
    },
    {
      title: t('updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (date) => formatDate(date),
    },
    {
      title: t('action'),
      width: 80,
      render: (_, product) => (
        <AntSpace>
          <AntButton
            type="primary"
            size="small"
            icon={<PencilIcon />}
            onClick={() => navigate(`${RoutePathEnum.Products}/${product.id}`)}
          />
          <AntButton
            type="primary"
            danger
            size="small"
            icon={<TrashIcon />}
            onClick={() => handleDeleteConfirm(product)}
          />
        </AntSpace>
      ),
    },
  ];

  return (
    <AntFlex vertical={true} gap={16}>
      <Head title={t('products')} />
      <ProductsHeader />
      <AntSpace>
        <AntInput
          placeholder={t('search_product')}
          value={searchText}
          onChange={handleSearch}
          prefix={<MagnifyingGlassIcon color="var(--color-black-500)" />}
        />
      </AntSpace>
      <AntTable<Product>
        columns={columns}
        dataSource={products}
        pagination={pagination}
        loading={isLoading}
        bordered
        scroll={{ y: 'calc(100vh - 370px)', x: 'max-content' }}
        onChange={handleTableChange}
      />
      {openConfirmModal && (
        <ConfirmModal
          title={t('delete_product')}
          open={openConfirmModal}
          loading={isLoadingDelete}
          content={
            <Trans
              i18nKey="delete_confirm"
              values={{ name: get(selectedProduct, 'name') }}
              components={[<AntTypography.Text strong />]}
            />
          }
          onCancel={() => setOpenConfirmModal(false)}
          onAccept={handleDeleteProduct}
        />
      )}
    </AntFlex>
  );
};

export default ProductsPage;
