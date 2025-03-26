import { login, getUserInfo } from 'apis/auth';
import { setToken, setRefreshToken } from 'utils/cookies';
import useAuthStore from 'stores/auth';
import styles from './styles.module.less';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useCookie();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const { setUserInfo } = useAuthStore();

  const schema = z.object({
    email: z.string().email(t('invalid_email')),
    password: z
      .string()
      .min(8, { message: t('password_min') })
      .max(32, { message: t('password_max') }),
    // .regex(/[A-Z]/, {
    //   message: t('password_uppercase'),
    // })
    // .regex(/[a-z]/, {
    //   message: t('password_lowercase'),
    // })
    // .regex(/[0-9]/, { message: t('password_number') }),
    // .regex(/[^A-Za-z0-9]/, {
    //   message: t('password_special'),
    // }),
  });

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: false,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (token) => {
      setToken(get(token, 'access_token'));
      setRefreshToken(get(token, 'refresh_token'));
      refetch();
      if (isSuccess) {
        setUserInfo(data);
      }
      showSuccess(t('login_success'));
    },
    onError: (error) => {
      showError(get(error, 'message'));
    },
  });

  const { control, handleSubmit } = useForm<UserLogin>({
    defaultValues: {
      email: 'john@mail.com',
      password: 'changeme',
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const onSubmit = (data: UserLogin): void => {
    loginMutation.mutate(data);
  };

  return (
    <div className={styles.login}>
      <Head title={t('login')} />
      <div className={styles['login-header']}>
        <div className={styles['login-header-content']}>
          <h1 className={styles['login-title']}>{t('login')}</h1>
          <p className={styles['login-description']}>
            {t('login_description')}
          </p>
        </div>
      </div>
      <AntForm
        className={styles['login-form']}
        name="loginForm"
        autoComplete="off"
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <Input
          name="email"
          label={t('email')}
          control={control}
          prefixIcon={<EnvelopeIcon color="var(--color-black-500)" />}
        />
        <Input
          name="password"
          type="password"
          label={t('password')}
          control={control}
          prefixIcon={<LockKeyIcon color="var(--color-black-500)" />}
        />
        <AntFlex>
          <AntButton
            type="primary"
            htmlType="submit"
            block
            loading={loginMutation.isPending}
          >
            {t('login')}
          </AntButton>
        </AntFlex>
      </AntForm>
    </div>
  );
};

export default LoginPage;
