import { getOrderDetail } from 'apis/orders';
import { RoutePathEnum } from 'enums/app';

type UseProductDetail = {
  isLoading: boolean;
  breadcrumbItems: BreadcrumbItemType[];
  data?: Order;
};

const useProductDetail = (): UseProductDetail => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { showError } = useToast();

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      path: RoutePathEnum.Dashboard,
      title: t('dashboard'),
    },
    {
      path: RoutePathEnum.Orders,
      title: t('orders'),
    },
    {
      title: t('order_detail'),
    },
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ['orderDetail', id],
    queryFn: () => getOrderDetail(id as string),
  });

  useEffect(() => {
    if (isError) {
      showError(t('error_get_order_detail'));
    }
  }, [isError]);

  return {
    isLoading,
    breadcrumbItems,
    data,
  };
};

export default useProductDetail;
