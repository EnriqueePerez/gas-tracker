import { Button, CloseButton, Stack, StackProps, Text } from '@chakra-ui/react';
import fp from 'lodash/fp';

export enum InputSizeEnum {
  sm = '32px',
  md = '40px',
  lg = '48px',
}

export interface ICustomInput extends StackProps {
  /**
   * Input border color.
   */
  border: string;
  /**
   * Selected file object or name.
   */
  file?: File | string;
  /**
   * If true the input will be disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the formik has found an error on the input.
   */
  isInvalid: boolean;
  /**
   * Action that will clear the input value from screen and formik.
   */
  onClear: () => void;
  /**
   * Action that will open the computer finder in order to select an image.
   */
  onSelect: () => void;
  /**
   * Components custom size.
   */
  size: string;
}

export const CustomInput: React.FC<ICustomInput> = (props): JSX.Element => {
  const {
    border,
    file,
    isDisabled,
    isInvalid,
    onClear,
    onSelect,
    size,
    ...rest
  } = props;

  return (
    <Stack
      borderColor={isInvalid ? 'red.500' : border}
      maxH={InputSizeEnum[size as keyof typeof InputSizeEnum]}
      {...rest}
    >
      {fp.isNil(file) ? (
        <Text fontSize="xs" fontWeight="medium">
          Selecciona
        </Text>
      ) : (
        <Text fontSize="xs">{fp.get('name')(file)}</Text>
      )}
      {fp.isNil(file) ? (
        <Button
          colorScheme="blue"
          isDisabled={isDisabled}
          onClick={onSelect}
          px={4}
          size="xs"
        >
          Buscar
        </Button>
      ) : (
        <CloseButton isDisabled={isDisabled} onClick={onClear} size="sm" />
      )}
    </Stack>
  );
};

CustomInput.defaultProps = {
  align: 'center',
  borderRadius: '4px',
  borderWidth: '1px',
  isInline: true,
  justify: 'space-between',
  pl: 4,
  pr: 2,
  py: 2,
};
