import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';

export interface IInputFieldProps extends FormControlProps {
  /**
   * Input label, this property is optional.
   */
  label?: string;
  /**
   * Input unique name for form handling.
   */
  name: string;
  /**
   * Input placeholder, this property is optional.
   */
  placeholder?: string;
  /**
   * Input size, default is `sm`.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Input type, default is `text`.
   */
  type?: string;
}

export const InputField = (props: IInputFieldProps): JSX.Element => {
  const { label, name, placeholder, size, type, ...rest } = props;

  const [field, meta] = useField(name);

  return (
    <FormControl
      isInvalid={!!meta.error && !!meta.touched}
      name={name}
      {...rest}
    >
      {label ? <FormLabel>{label}</FormLabel> : null}

      <Input placeholder={placeholder} size={size} type={type} {...field} />

      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};

InputField.defaultProps = {
  label: undefined,
  placeholder: undefined,
  size: 'sm',
  type: 'text',
};
