type InputNumberProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  addonAfter?: string;
  register?: UseFormRegister<T>;
};

const InputNumber = <T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  addonAfter,
  register = () => ({
    //
  }),
}: InputNumberProps<T>) => {
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
          <AntInputNumber
            {...field}
            name={name}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            placeholder={placeholder}
            addonAfter={addonAfter}
          />
        </AntForm.Item>
      )}
    />
  );
};

export default InputNumber;
