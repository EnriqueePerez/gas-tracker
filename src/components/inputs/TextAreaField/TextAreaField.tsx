import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';

export interface ITextAreaFieldProps extends FormControlProps {
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

export const TextAreaField = (props: ITextAreaFieldProps): JSX.Element => {
  const { label, name, placeholder, size, ...rest } = props;

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

      <Textarea placeholder={placeholder} size={size} {...field} />

      {meta.error ? (
        <FormErrorMessage fontSize="xs" fontWeight="bold">
          {meta.error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

TextAreaField.defaultProps = {
  label: undefined,
  placeholder: undefined,
  size: 'sm',
};
