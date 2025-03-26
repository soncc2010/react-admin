import { Doughnut } from 'react-chartjs-2';
import { ChartOptions, ChartData, Chart } from 'chart.js';

const SalesProgress: FC = () => {
  const { t } = useTranslation();

  const statistics: OptionType[] = [
    {
      label: t('target'),
      value: '$20K',
      icon: (
        <ArrowDownIcon color="var(--color-red)" style={{ display: 'block' }} />
      ),
    },
    {
      label: t('revenue'),
      value: '$16K',
      icon: (
        <ArrowUpIcon color="var(--color-green)" style={{ display: 'block' }} />
      ),
    },
    {
      label: t('today'),
      value: '$1.5K',
      icon: (
        <ArrowUpIcon color="var(--color-green)" style={{ display: 'block' }} />
      ),
    },
  ];

  const data: ChartData<'doughnut'> = {
    labels: [t('achieved'), t('not_achieved')],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['#001529', '#F0F1F3'],
        borderColor: 'transparent',
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: false,
    maintainAspectRatio: true,
    cutout: '85%',
    radius: '85%',
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
  };

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: Chart) => {
      const { ctx } = chart;
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2 + 10;

      ctx.save();
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${head(get(head(data.datasets), 'data', []))}%`,
        centerX,
        centerY,
      );
    },
  };

  return (
    <AntCard title={t('sales_progress')}>
      <AntFlex justify="center">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </AntFlex>
      <AntTypography.Paragraph type="secondary" style={{ textAlign: 'center' }}>
        <Trans
          i18nKey="you_succeed"
          values={{ value: formatCurrency(1000000) }}
          components={[<AntTypography.Text strong />]}
        />
      </AntTypography.Paragraph>
      <AntFlex justify="space-between">
        {map(statistics, (statistic: OptionType, index: number) => (
          <AntFlex key={index} vertical justify="center">
            <AntTypography.Text type="secondary">
              {t(statistic.label)}
            </AntTypography.Text>
            <AntSpace style={{ gap: 0 }}>
              <AntTypography.Text strong>{statistic.value}</AntTypography.Text>
              {statistic.icon}
            </AntSpace>
          </AntFlex>
        ))}
      </AntFlex>
    </AntCard>
  );
};

export default SalesProgress;
