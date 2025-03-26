import { updateOrderStatus } from 'apis/orders';
import { OrderStatusEnum } from 'enums/order';
import styles from './styles.module.less';

type OrderDetailProps = {
  data: Order;
};

const OrderDetail: FC<OrderDetailProps> = ({ data }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { control, reset, handleSubmit } = useForm<OrderStatusFormData>({
    mode: 'onChange',
    defaultValues: {
      status: OrderStatusEnum.Cancelled,
    },
  });

  const statusOptions: SelectProps['options'] = [
    {
      label: t('pending'),
      value: OrderStatusEnum.Pending,
    },
    {
      label: t('processing'),
      value: OrderStatusEnum.Processing,
    },
    {
      label: t('shipped'),
      value: OrderStatusEnum.Shipped,
    },
    {
      label: t('delivered'),
      value: OrderStatusEnum.Delivered,
    },
    {
      label: t('cancelled'),
      value: OrderStatusEnum.Cancelled,
    },
    {
      label: t('refunded'),
      value: OrderStatusEnum.Refunded,
    },
  ];

  useEffect(() => {
    reset({
      status: OrderStatusEnum.Shipped,
    });
  }, [data]);

  const handleChangeStatus: FormProps<OrderStatusFormData>['onFinish'] =
    async () => {
      try {
        setIsSubmitting(true);
        // TODO: Update order status
        await updateOrderStatus();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <AntCard>
      <AntFlex gap={16} align="center" justify="space-between" wrap>
        <AntSpace direction="vertical" size={0}>
          <AntTypography.Text strong>
            {t('order_id')}: {get(data, 'orderId')}
          </AntTypography.Text>
          <AntTypography.Text type="secondary">
            {t('order_created')} : {formatDate(get(data, 'orderDate'))}
          </AntTypography.Text>
        </AntSpace>
        <AntSpace>
          <AntForm onFinish={handleSubmit(handleChangeStatus)}>
            <AntSpace className={styles['order-status']}>
              <Select
                options={statusOptions}
                control={control}
                name="status"
                width="120px"
              />
              <AntButton
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
              >
                {t('save')}
              </AntButton>
            </AntSpace>
          </AntForm>
        </AntSpace>
      </AntFlex>
    </AntCard>
  );
};

export default OrderDetail;
