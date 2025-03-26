type SelectBoxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: SelectProps['options'];
  label?: string;
  placeholder?: string;
  width?: string;
};

const Select = <T extends FieldValues>({
  name,
  label,
  control,
  options = [],
  placeholder,
  width = '100%',
}: SelectBoxProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <AntForm.Item
          label={label}
          validateStatus={get(errors, [name]) ? 'error' : ''}
          help={get(errors, [name, 'message'])}
          style={{ width }}
        >
          <AntSelect
            {...field}
            value={field.value}
            placeholder={placeholder}
            options={options}
          />
        </AntForm.Item>
      )}
    />
  );
};

export default Select;
