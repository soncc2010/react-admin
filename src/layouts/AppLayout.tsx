import { getUserInfo } from 'apis/auth';
import useAuthStore from 'stores/auth';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import withAuthentication from 'HOC/withAuthentication';
import styles from './styles.module.less';

const AppLayout = () => {
  const { setUserInfo } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <AntSpin />
      </div>
    );
  }

  return (
    <AntLayout>
      <Sidebar />
      <AntLayout>
        <Header />
        <AntLayout.Content className={styles.main}>
          <Outlet />
        </AntLayout.Content>
      </AntLayout>
    </AntLayout>
  );
};

const ProtectedDashboard = withAuthentication(AppLayout);

export default ProtectedDashboard;
