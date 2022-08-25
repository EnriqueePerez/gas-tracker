import { Box, BoxProps } from '@chakra-ui/react';

export type ILayoutProps = BoxProps;

export const Layout: React.FC<ILayoutProps> = (props): JSX.Element => {
  const { children, ...rest } = props;
  return (
    <Box {...rest} overflowX="hidden">
      {children}
    </Box>
  );
};

Layout.defaultProps = {
  alignItems: 'center',
  display: 'flex',
  flexDir: 'column',
  position: 'relative',
  px: 4,
  py: 20,
};
