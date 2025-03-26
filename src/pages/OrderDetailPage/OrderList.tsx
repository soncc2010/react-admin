type OrderListProps = {
  products: ProductOrder[];
};

const OrderList: FC<OrderListProps> = ({ products }) => {
  const { t } = useTranslation();
  const shippingRate: number = 50000;
  const total = sumBy(
    products,
    (product: ProductOrder) => product.price * product.quantity,
  );
  const grandTotal = total + shippingRate;

  const columns: TableProps<ProductOrder>['columns'] = [
    {
      title: t('image'),
      dataIndex: 'images',
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
      width: 140,
    },
    {
      title: t('title'),
      dataIndex: 'title',
    },
    {
      title: t('price'),
      dataIndex: 'price',
      width: 140,
      render: (price) => formatCurrency(price),
    },
    {
      title: t('quantity'),
      dataIndex: 'quantity',
      width: 140,
      render: (quantity) => formatNumber(quantity),
    },
    {
      title: t('total'),
      width: 140,
      render: (row) => formatCurrency(row.price * row.quantity),
    },
  ];

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('sub_total'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: formatCurrency(total),
    },
    {
      key: '2',
      label: `${t('vat')}(0%)`,
      span: 'filled',
      labelStyle: { width: 140 },
      children: 0,
    },
    {
      key: '3',
      label: t('shipping_rate'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: formatNumber(shippingRate),
    },
    {
      key: '4',
      label: t('grand_total'),
      span: 'filled',
      labelStyle: { width: 140 },
      children: (
        <AntTypography.Text strong>
          {formatCurrency(grandTotal)}
        </AntTypography.Text>
      ),
    },
  ];

  return (
    <AntCard title={t('order_list')}>
      <AntFlex gap={24} vertical>
        <AntTable<ProductOrder>
          columns={columns}
          dataSource={products}
          bordered
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        <AntDescriptions title={t('order_summary')} items={items} bordered />
      </AntFlex>
    </AntCard>
  );
};

export default OrderList;
