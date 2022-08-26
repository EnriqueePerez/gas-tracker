import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

export interface IUserOptionsMenuProps extends BoxProps {
  /**
   * On click handler for logout action.
   */
  handleLogout: () => Promise<void>;
}

export const UserOptionsMenu: React.FC<IUserOptionsMenuProps> = (props) => {
  const { handleLogout, ...rest } = props;

  return (
    <Box {...rest}>
      <Menu closeOnSelect={false}>
        <MenuButton
          aria-label="UserOptions"
          as={IconButton}
          icon={<FaUser />}
          variant="ghost"
        />
        <MenuList maxW="100vw">
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
