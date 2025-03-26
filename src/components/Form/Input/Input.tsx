import { ControllerRenderProps } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'textarea';
  prefixIcon?: ReactNode;
  register?: UseFormRegister<T>;
};

const Input = <T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  type = 'text',
  prefixIcon,
  register = () => ({
    //
  }),
}: InputProps<T>) => {
  const renderInput = (field: ControllerRenderProps<T>): ReactElement => {
    switch (type) {
      case 'textarea':
        return <AntInput.TextArea {...field} placeholder={placeholder} />;
      case 'password':
        return (
          <AntInput.Password
            {...field}
            prefix={prefixIcon}
            placeholder={placeholder}
          />
        );
      default:
        return (
          <AntInput {...field} prefix={prefixIcon} placeholder={placeholder} />
        );
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <AntForm.Item
          {...register(name)}
          label={label}
          validateStatus={get(errors, [name]) ? 'error' : ''}
          help={get(errors, [name, 'message'])}
        >
          {renderInput(field)}
        </AntForm.Item>
      )}
    />
  );
};

export default Input;
