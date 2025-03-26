import { createUser } from 'apis/user';

type CreateUserModalProps = {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
};

const CreateUserModal: FC<CreateUserModalProps> = ({
  open,
  onCancel,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { showError, showSuccess } = useToast();

  const schema = z.object({
    name: z.string().nonempty(t('field_required', { field: t('name') })),
    email: z.string().email(t('invalid_email')),
    password: z
      .string()
      .min(8, { message: t('password_min') })
      .max(32, { message: t('password_max') })
      .regex(/[A-Z]/, {
        message: t('password_uppercase'),
      })
      .regex(/[a-z]/, {
        message: t('password_lowercase'),
      })
      .regex(/[0-9]/, { message: t('password_number') }),
  });

  const { control, handleSubmit, trigger, reset } = useForm<CreateUser>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      handleCancel();
      showSuccess(t('create_user_success'));
      onSuccess();
    },
    onError: (error) => {
      showError(get(error, 'message'));
    },
  });

  const handleCancel = (): void => {
    reset();
    onCancel();
  };

  const onSubmit = (data: CreateUser): void => {
    createUserMutation.mutate({
      ...data,
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
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
      title={t('create_user')}
      centered
      open={open}
      maskClosable={false}
      closable={false}
      onOk={handleCreateUser}
      okText={t('save')}
      confirmLoading={createUserMutation.isPending}
      cancelButtonProps={{ disabled: createUserMutation.isPending }}
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
        <Input
          name="password"
          type="password"
          label={t('password')}
          control={control}
        />
      </AntForm>
    </AntModal>
  );
};

export default CreateUserModal;
