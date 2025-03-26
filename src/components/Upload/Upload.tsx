import { Path } from 'react-hook-form';
import { uploadFile } from 'apis/files';
import styles from './styles.module.less';

type UploadFileProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  limit?: number;
};

const Upload = <T extends FieldValues>({
  name,
  control,
  limit,
}: UploadFileProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { showError } = useToast();

  useEffect(() => {
    const fieldValue = isArray(field.value) ? field.value : [field.value];

    const newFileList = map(fieldValue, (url: string) => ({
      uid: uniqueId(),
      name: '',
      status: 'done',
      url,
    }));

    setFileList(newFileList);
  }, []);

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    const isValidType = file.type.startsWith('image/');
    const isValidSize = file.size / 1024 / 1024 < 2;

    if (!isValidType) {
      setErrorMessage(t('only_image'));
      return AntUpload.LIST_IGNORE;
    }

    if (!isValidSize) {
      setErrorMessage(t('file_size'));
      return AntUpload.LIST_IGNORE;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // TODO: replace with real api
      const { location } = await uploadFile({ file });
      const item: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        // TODO: replace with real image
        url: location,
      };

      if (limit && limit === 1) {
        setFileList([item]);
        field.onChange(get(head(field.value, limit), 'url'));
      } else {
        const uploadedFileList: UploadFile[] = [...fileList, item];
        setFileList(uploadedFileList);
        field.onChange(
          map(uploadedFileList, (item: UploadFile) => get(item, 'url')),
        );
      }
    } catch (error) {
      showError('Upload failed');
    }

    return AntUpload.LIST_IGNORE;
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
  };

  return (
    <AntForm.Item
      label={t('image')}
      validateStatus={errorMessage ? 'error' : ''}
      help={errorMessage}
    >
      <AntFlex vertical gap={16}>
        <AntUpload
          name={name}
          fileList={fileList}
          beforeUpload={beforeUpload}
          onRemove={handleRemove}
          listType="picture-card"
          maxCount={1}
        >
          <AntFlex vertical gap={8} align="center">
            <PlusIcon />
            <p className={styles['upload-description']}>{t('drag_and_drop')}</p>
          </AntFlex>
        </AntUpload>
      </AntFlex>
    </AntForm.Item>
  );
};

export default Upload;
