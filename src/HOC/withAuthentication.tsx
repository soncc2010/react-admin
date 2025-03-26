const withAuthentication = <P extends object>(
  WrappedComponent: ComponentType<P>,
): FC<P> => {
  const AuthenticatedComponent: FC<P> = (props) => {
    const { isAuthenticated } = useCookie();

    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuthentication;
