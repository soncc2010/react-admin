import { ChartOptions, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const StatisticsChart: FC = () => {
  const { t } = useTranslation();

  const data: ChartData<'bar'> = {
    labels: [
      t('january'),
      t('february'),
      t('march'),
      t('april'),
      t('may'),
      t('june'),
      t('july'),
    ],
    datasets: [
      {
        label: t('revenue'),
        data: [100, 200, 300, 400, 500, 600],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        barThickness: 20,
      },
      {
        label: t('sales'),
        data: [10, 90, 80, 300, 900, 500, 200],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        barThickness: 20,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: t('revenue_and_sales'),
      },
    },
  };

  return (
    <AntCard title={t('statistics')}>
      <div style={{ height: '250px' }}>
        <Bar options={options} data={data} />
      </div>
    </AntCard>
  );
};

export default StatisticsChart;
