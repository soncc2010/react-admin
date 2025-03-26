import styles from './styles.module.less';

type BreadcrumbProps = {
  title: string;
  items: BreadcrumbItemType[];
};

const Breadcrumb: FC<BreadcrumbProps> = ({ items = [], title }) => (
  <AntFlex vertical>
    {title && (
      <AntTypography.Title className={styles['breadcrumb-title']} level={3}>
        {title}
      </AntTypography.Title>
    )}
    <AntBreadcrumb
      items={map(items, (item: BreadcrumbItemType) => ({
        title: get(item, 'path') ? (
          <Link to={item.path}>{item.title}</Link>
        ) : (
          item.title
        ),
      }))}
    ></AntBreadcrumb>
  </AntFlex>
);

export default Breadcrumb;
