import styles from './styles.module.less';

type ConfirmModalModalProps = {
  open: boolean;
  title: string;
  onCancel: () => void;
  onAccept: () => Promise<void> | void;
  content?: ReactNode;
  loading?: boolean;
  okText?: string;
  danger?: boolean;
};

const ConfirmModal: FC<ConfirmModalModalProps> = ({
  open,
  title,
  content,
  loading,
  danger = true,
  okText,
  onCancel,
  onAccept,
}) => {
  const { t } = useTranslation();

  const renderTitle = (): ReactElement => {
    return (
      <AntFlex gap={8} align="center">
        <WarningCircleIcon color="var(--color-warning)" size={28} />
        {title}
      </AntFlex>
    );
  };

  return (
    <AntModal
      classNames={{
        body: styles['modal-confirm-body'],
      }}
      width={420}
      title={renderTitle()}
      centered
      open={open}
      maskClosable={false}
      closable={false}
      onOk={onAccept}
      okText={okText || t('delete')}
      confirmLoading={loading}
      cancelButtonProps={{ disabled: loading }}
      onCancel={onCancel}
      okButtonProps={{
        danger,
      }}
    >
      {content}
    </AntModal>
  );
};

export default ConfirmModal;
