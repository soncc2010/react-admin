import { editUser } from 'apis/user';

type EditUserModalProps = {
  user: User;
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
};

const EditUserModal: FC<EditUserModalProps> = ({
  user,
  open,
  onCancel,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { showError, showSuccess } = useToast();

  const schema = z.object({
    name: z.string().nonempty(t('field_required', { field: t('name') })),
    email: z.string().email(t('invalid_email')),
  });

  const { control, handleSubmit, trigger, reset } = useForm<EditUser>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const editUserMutation = useMutation({
    mutationFn: (data: EditUser) => editUser(user.id, data),
    onSuccess: () => {
      handleCancel();
      showSuccess(t('edit_user_success'));
      onSuccess();
    },
    onError: (error) => {
      showError(get(error, 'message'));
    },
  });

  useEffect(() => {
    reset({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  const handleCancel = (): void => {
    reset();
    onCancel();
  };

  const onSubmit = (data: EditUser): void => {
    editUserMutation.mutate({
      ...data,
    });
  };

  const handleCreateUser = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <AntModal
      title={t('edit_user')}
      centered
      open={open}
      maskClosable={false}
      closable={false}
      onOk={handleCreateUser}
      okText={t('save')}
      confirmLoading={editUserMutation.isPending}
      cancelButtonProps={{ disabled: editUserMutation.isPending }}
      onCancel={handleCancel}
    >
      <AntForm
        name="createUserForm"
        autoComplete="off"
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <Input name="name" label={t('name')} control={control} />
        <Input name="email" label={t('email')} control={control} />
      </AntForm>
    </AntModal>
  );
};

export default EditUserModal;
