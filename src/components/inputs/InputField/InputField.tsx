import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';

export interface IInputFieldProps extends FormControlProps {
  /**
   * Helper text, this property is optional.
   */
  helperText?: string;
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
  const { helperText, label, name, placeholder, size, type, ...rest } = props;

  const [field, meta] = useField(name);

  return (
    <FormControl
      isInvalid={!!meta.error && !!meta.touched}
      name={name}
      {...rest}
    >
      {label ? (
        <FormLabel fontSize={size} fontWeight="bold" htmlFor={name}>
          {label}
        </FormLabel>
      ) : null}

      <Input
        placeholder={placeholder}
        rounded={4}
        size={size}
        type={type}
        {...field}
      />

      {meta.error ? (
        <FormErrorMessage fontSize="xs" fontWeight="bold">
          {meta.error}
        </FormErrorMessage>
      ) : null}

      {helperText ? (
        <FormHelperText color="gray.400" fontSize="xs" fontWeight="bold">
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

InputField.defaultProps = {
  helperText: undefined,
  label: undefined,
  placeholder: undefined,
  size: 'sm',
  type: 'text',
};
