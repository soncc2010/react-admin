import { getProducts } from 'apis/products';

const TopSellingProducts: FC = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { data = [], isLoading } = useQuery({
    queryKey: ['top-selling-products'],
    queryFn: getProducts,
  });

  useEffect(() => {
    setPagination({
      ...pagination,
      total: size(data),
    });
  }, [data]);

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
      title: t('product_name'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('sales'),
      dataIndex: 'sales',
      key: 'sales',
      width: 80,
      render: () => 10,
    },
    {
      title: t('price'),
      dataIndex: 'price',
      key: 'price',
      width: 140,
      render: (price) => formatCurrency(price),
    },
    {
      title: t('amount'),
      key: 'amount',
      width: 140,
      render: (product) => formatCurrency(product.price * 10),
    },
  ];

  const handleTableChange = (newPagination: TablePaginationConfig): void => {
    setPagination(newPagination);
  };

  return (
    <AntFlex vertical gap={8}>
      <AntTypography.Title level={5}>
        {t('top_selling_products')}
      </AntTypography.Title>
      <AntTable<Product>
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={isLoading}
        bordered
        scroll={{ x: 'max-content' }}
        onChange={handleTableChange}
      />
    </AntFlex>
  );
};

export default TopSellingProducts;
