const useToast = () => {
  const { notification } = AntApp.useApp();

  const showSuccess = (message: string) => {
    notification.open({
      message,
      type: 'success',
      placement: 'topRight',
    });
  };

  const showError = (message: string) => {
    notification.open({
      message,
      type: 'error',
      placement: 'topRight',
    });
  };

  return {
    showSuccess,
    showError,
  };
};

export default useToast;
