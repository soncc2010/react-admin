import SalesProgress from './SalesProgress';
import Statistics from './Statistics';
import StatisticsChart from './StatisticsChart';
import TopSellingProducts from './TopSellingProducts';

const DashboardPage: FC = () => {
  const { t } = useTranslation();

  return (
    <AntFlex vertical gap={16}>
      <Head title={t('dashboard')} />
      <Statistics />
      <AntRow gutter={[16, 16]}>
        <AntCol span={24} xxl={{ flex: '30%' }}>
          <SalesProgress />
        </AntCol>
        <AntCol span={24} xxl={{ flex: '70%' }} style={{ overflow: 'hidden' }}>
          <StatisticsChart />
        </AntCol>
      </AntRow>
      <TopSellingProducts />
    </AntFlex>
  );
};

export default DashboardPage;
