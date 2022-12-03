import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Input,
} from '@chakra-ui/react';
import { FieldHelperProps, FieldMetaProps, useField } from 'formik';
import fp from 'lodash/fp';
import { ChangeEvent, useRef } from 'react';

import { CustomInput } from './components/CustomInput';
// import { createImageURL, getImage, hasImage, isFromURL } from './helpers';

export interface IFileFieldProps extends Omit<FormControlProps, 'size'> {
  /**
   * If `true`, the component will show a preview of the image.
   */
  // allowPreview?: boolean;
  /**
   * Input border color.
   */
  border?: string;
  /**
   * Input helper text that will be displayed below the input.
   */
  helperText?: string;
  /**
   * Input label, can be a raw text or an i18n key.
   */
  label?: string;
  /**
   * Label custom properties.
   */
  labelProps?: FormLabelProps;
  /**
   * Input name that Formik will use to identify the input on the HTML code.
   */
  name: string;
  /**
   * Input field size, can be `sm`, `md` or `lg`.
   */
  size?: 'sm' | 'md' | 'lg';
}

export const FileField: React.FC<IFileFieldProps> = (props): JSX.Element => {
  const {
    border = 'blackAlpha.100',
    helperText = 'file.default-helper',
    isDisabled,
    label,
    labelProps = {},
    name,
    size = 'sm',
    ...rest
  } = props;

  const setTouchedInput = fp.curry(
    (meta: FieldMetaProps<unknown>, helpers: FieldHelperProps<unknown>) => {
      if (!meta.touched) helpers.setTouched(true);
    },
  );

  const [field, meta, helpers] = useField(name);

  const ref = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    helpers.setTouched(true);

    const file = fp.compose(fp.head, fp.get('target.files'))(e);
    const reader = new FileReader();
    reader.onloadend = () => {
      helpers.setValue(file);
    };
    reader.readAsDataURL(file);
  };

  const handleOnClear = () => {
    helpers.setValue(undefined);
  };

  const handleOnSelect = () => {
    fp.invoke('current.click')(ref);
    setTouchedInput(meta, helpers);
  };

  const isInvalid = !!meta.error && !!meta.touched;

  return (
    <FormControl isInvalid={isInvalid} name={name} {...rest}>
      <FormLabel fontSize={size} htmlFor={name} {...labelProps}>
        {label}
      </FormLabel>
      {/* {!hasImage(field) && allowPreview ? (
        <Box mb={4}>
          <Image
            alt="company-logo"
            fit="cover"
            h="100%"
            src={isFromURL(field) ? getImage(field) : createImageURL(field)}
            w="100%"
          />
        </Box>
      ) : null} */}

      <Input
        ref={ref}
        display="none"
        name={name}
        onChange={handleOnChange}
        type="file"
      />
      <CustomInput
        border={border}
        file={field.value}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        onClear={handleOnClear}
        onSelect={handleOnSelect}
        size={size}
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
