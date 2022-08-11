import { BoxProps, Th as ChakraTh } from '@chakra-ui/react';

export type IThProps = BoxProps;

export const Th: React.FC<IThProps> = (props): JSX.Element => {
  const { children, ...rest } = props;

  return <ChakraTh {...rest}>{children}</ChakraTh>;
};

Th.defaultProps = {
  py: 4,
  whiteSpace: 'nowrap',
};
