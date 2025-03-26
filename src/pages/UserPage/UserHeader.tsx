const CreateUserModal = lazy(() => import('modals/CreateUserModal'));

type UserHeaderProps = {
  onSuccess: () => void;
};

const UserHeader: FC<UserHeaderProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      path: '/',
      title: t('dashboard'),
    },
    {
      title: t('users'),
    },
  ];

  return (
    <AntFlex vertical={true} gap={16}>
      <AntRow align="bottom">
        <AntCol flex="auto">
          <Breadcrumb title={t('users')} items={breadcrumbItems} />
        </AntCol>
        <AntCol flex="none">
          <AntButton
            type="primary"
            icon={<PlusIcon />}
            onClick={() => setOpen(true)}
          >
            {t('create_user')}
          </AntButton>
        </AntCol>
      </AntRow>
      {open && (
        <CreateUserModal
          open={open}
          onCancel={() => setOpen(false)}
          onSuccess={onSuccess}
        />
      )}
    </AntFlex>
  );
};

export default UserHeader;
