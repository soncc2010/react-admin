type MetaProps = {
  title: string;
};

const Head: FC<MetaProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Head;
