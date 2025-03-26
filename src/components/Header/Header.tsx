import { RoutePathEnum } from 'enums/app';
import useAuthStore from 'stores/auth';
import styles from './styles.module.less';

const Header: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout, userInfo } = useAuthStore();

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: <Link to={RoutePathEnum.Profile}>{t('profile')}</Link>,
      icon: <GearIcon />,
    },
    {
      key: 'password',
      label: <Link to={RoutePathEnum.Password}>{t('changePassword')}</Link>,
      icon: <KeyIcon />,
    },
    {
      type: 'divider',
    },
    {
      label: t('logout'),
      key: 'logout',
      danger: true,
      icon: <PowerIcon />,
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  return (
    <AntLayout.Header className={styles.header}>
      <AntDropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{ top: '60px' }}
      >
        <AntButton type="link">
          <span>{get(userInfo, 'name')}</span>
          <AntAvatar
            size={28}
            icon={<PackageIcon />}
            src={get(userInfo, 'avatar')}
          />
        </AntButton>
      </AntDropdown>
    </AntLayout.Header>
  );
};

export default Header;
