import SunEditor from 'suneditor-react';
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  image,
  link,
} from 'suneditor/src/plugins';
import 'suneditor/dist/css/suneditor.min.css';

type EditorProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  addonAfter?: string;
  register?: UseFormRegister<T>;
};

const Editor = <T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  register = () => ({
    //
  }),
}: EditorProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <AntForm.Item
          {...register(name)}
          label={label}
          name={name as string}
          validateStatus={get(errors, [name]) ? 'error' : ''}
          help={get(errors, [name, 'message'])}
        >
          <SunEditor
            {...field}
            height="300px"
            setOptions={{
              placeholder,
              plugins: [
                align,
                font,
                fontColor,
                fontSize,
                formatBlock,
                hiliteColor,
                horizontalRule,
                lineHeight,
                list,
                paragraphStyle,
                table,
                template,
                textStyle,
                image,
                link,
              ],
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['paragraphStyle'],
                [
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'subscript',
                  'superscript',
                ],
                ['fontColor', 'hiliteColor'],
                ['removeFormat'],
                '/',
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['table', 'link', 'image'],
              ],
              formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
              font: [
                'Arial',
                'Calibri',
                'Comic Sans',
                'Courier',
                'Garamond',
                'Georgia',
                'Impact',
                'Lucida Console',
                'Palatino Linotype',
                'Segoe UI',
                'Tahoma',
                'Times New Roman',
                'Trebuchet MS',
              ],
            }}
          />
        </AntForm.Item>
      )}
    />
  );
};

export default Editor;
