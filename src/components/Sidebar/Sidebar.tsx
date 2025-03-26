import { RoutePathEnum } from 'enums/app';
import useAuthStore from 'stores/auth';
import styles from './styles.module.less';

const Sidebar: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const location = useLocation();

  const menus: MenuItem[] = [
    {
      key: 'dashboard',
      label: <NavLink to={RoutePathEnum.Dashboard}>{t('dashboard')}</NavLink>,
      icon: <SquaresFourIcon />,
    },
    {
      key: 'product',
      label: t('product'),
      icon: <PackageIcon />,
      children: [
        {
          key: 'products',
          label: <NavLink to={RoutePathEnum.Products}>{t('products')}</NavLink>,
        },
        {
          key: 'categories',
          label: (
            <NavLink to={RoutePathEnum.Categories}>{t('categories')}</NavLink>
          ),
        },
      ],
    },
    {
      key: 'users',
      label: <NavLink to={RoutePathEnum.Users}>{t('users')}</NavLink>,
      icon: <UsersIcon />,
    },
    {
      key: 'orders',
      label: <NavLink to={RoutePathEnum.Orders}>{t('orders')}</NavLink>,
      icon: <ShoppingCartIcon />,
    },
  ];

  const allKeys = flatMap(menus, (item: MenuItem) => [
    get(item, 'key'),
    ...(get(item, 'children') ? map(get(item, 'children'), 'key') : []),
  ]);

  const selectedKey = filter(allKeys, (value: string) =>
    location.pathname.includes(value),
  );

  return (
    <AntLayout.Sider
      breakpoint="lg"
      theme="dark"
      width="250px"
      className={styles.sidebar}
    >
      <div className={styles['sidebar-logo']}>
        <AntImage src="/assets/images/logo.png" preview={false} width={30} />
      </div>
      <div className={styles['sidebar-menu']}>
        <AntMenu
          theme="dark"
          items={menus}
          mode="inline"
          defaultOpenKeys={['product']}
          selectedKeys={selectedKey}
        />
      </div>
      <div className={styles['sidebar-bottom']}>
        <AntMenu
          theme="dark"
          mode="inline"
          items={[
            {
              key: 'profile',
              label: t('logout'),
              icon: <PowerIcon />,
              onClick: () => {
                logout();
                navigate(RoutePathEnum.Login);
              },
            },
          ]}
        />
      </div>
    </AntLayout.Sider>
  );
};

export default Sidebar;
