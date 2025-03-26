const NotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t('pageNotFound')} />
    </>
  );
};

export default NotFound;
