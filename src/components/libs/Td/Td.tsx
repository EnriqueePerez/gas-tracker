import { BoxProps, Td as ChakraTd } from '@chakra-ui/react';

export type ITdProps = BoxProps;

export const Td: React.FC<ITdProps> = (props): JSX.Element => {
  const { children, ...rest } = props;

  return <ChakraTd {...rest}>{children}</ChakraTd>;
};

Td.defaultProps = {
  py: 4,
  whiteSpace: 'nowrap',
};
