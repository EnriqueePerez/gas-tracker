import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';

export type IBackButtonProps = Omit<IconButtonProps, 'aria-label'>;

export const BackButton: React.FC<IBackButtonProps> = (props): JSX.Element => (
  <IconButton aria-label="go-to-homepage" icon={<FaArrowLeft />} {...props} />
);

BackButton.defaultProps = {
  color: 'current',
  fontSize: 'lg',
  left: 4,
  marginLeft: '2',
  position: 'absolute',
  size: 'md',
  top: 4,
  variant: 'ghost',
};
