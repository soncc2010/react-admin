type ModalConfirm = {
  contextHolder: React.ReactElement;
  handleConfirm: (data: {
    title: string;
    content: React.ReactNode;
    onOk: () => Promise<void>;
    danger?: boolean;
  }) => void;
};

const useModalConfirm = (): ModalConfirm => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalInstance, contextHolder] = AntModal.useModal();

  const handleConfirm = ({
    title,
    content,
    onOk,
    danger = true,
  }: {
    title: string;
    content: React.ReactNode;
    onOk: () => Promise<void>;
    danger?: boolean;
  }): void => {
    modalInstance.confirm({
      title,
      content,
      centered: true,
      okText: t('delete'),
      cancelText: t('cancel'),
      onOk: () => {
        setLoading(true);
        return onOk().catch(() => Promise.reject());
      },
      okButtonProps: {
        loading: loading,
        danger,
      },
      cancelButtonProps: {
        disabled: loading,
      },
    });
  };

  return {
    contextHolder,
    handleConfirm,
  };
};

export default useModalConfirm;
