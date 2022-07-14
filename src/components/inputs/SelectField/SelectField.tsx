import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { useField } from 'formik';

export interface ISelectFieldProps extends FormControlProps {
  /**
   * Helper text, this property is optional.
   */
  helperText?: string;
  /**
   * Select label, this property is optional.
   */
  label?: string;
  /**
   * Select unique name for form handling.
   */
  name: string;
  /**
   * Select placeholder, this property is optional.
   */
  placeholder?: string;
  /**
   * Select size, default is `sm`.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const SelectField = (props: ISelectFieldProps): JSX.Element => {
  const { children, helperText, label, name, placeholder, size, ...rest } =
    props;

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

      <Select placeholder={placeholder} rounded={4} size={size} {...field}>
        {children}
      </Select>

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

SelectField.defaultProps = {
  helperText: undefined,
  label: undefined,
  placeholder: undefined,
  size: 'sm',
};
