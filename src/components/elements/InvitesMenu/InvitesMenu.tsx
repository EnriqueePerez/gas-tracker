import {
  Box,
  BoxProps,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { nanoid } from 'nanoid';
import { FaRegBell } from 'react-icons/fa';

import { ISendedTank } from '../../../hooks/useSendedTanks';

export interface IInvitesMenuProps extends BoxProps {
  /**
   * Transfer invites listing.
   */
  invites?: ISendedTank[];
  /**
   * On click handler for accept invite action.
   */
  onAccept: (v: Partial<ISendedTank>, id: string) => void;
  /**
   * On click handler for reject invite action.
   */
  onReject: (v: Partial<ISendedTank>, id: string) => void;
  /**
   * Login user.
   */
  user: User | null;
}

export const InvitesMenu: React.FC<IInvitesMenuProps> = (props) => {
  const { invites = [], onAccept, onReject, user, ...rest } = props;

  return (
    <Box {...rest}>
      <Menu closeOnSelect={false}>
        <MenuButton
          aria-label="Invites"
          as={IconButton}
          icon={<FaRegBell />}
          variant="ghost"
        />
        <MenuList maxW="100vw">
          {invites?.map((invite: ISendedTank) => (
            <MenuItem
              key={nanoid()}
              _hover={{ background: 'transparent' }}
              as={Box}
              display="flex"
              flexDirection="column"
            >
              <Text fontSize="xs" fontWeight="medium">
                Te estan transfiriendo la boya ({invite?.tank_id})
              </Text>
              <Stack isInline mt={2} spacing={2} w="100%">
                <Button
                  colorScheme="gray"
                  flex={1}
                  onClick={() =>
                    onReject(
                      {
                        status: 'rejected',
                      },
                      invite?.id as string,
                    )
                  }
                  px={6}
                  size="xs"
                >
                  Rechazar
                </Button>
                <Button
                  colorScheme="blue"
                  flex={1}
                  onClick={() =>
                    onAccept(
                      {
                        new_owner_id: Number(user?.uid),
                        new_owner_name: user?.displayName?.toString(),
                        status: 'accepted',
                        tank_id: invite?.tank_id,
                      },
                      invite?.id as string,
                    )
                  }
                  px={6}
                  size="xs"
                >
                  Aceptar
                </Button>
              </Stack>
            </MenuItem>
          ))}

          {!invites.length ? (
            <MenuItem>
              <Text fontSize="xs" fontWeight="medium">
                No tienes solicitudes de transferencia pendientes.
              </Text>
            </MenuItem>
          ) : null}
        </MenuList>
      </Menu>

      {invites?.length ? (
        <Flex
          align="center"
          bg="red.500"
          fontSize="9px"
          fontWeight="bold"
          h={4}
          justify="center"
          position="absolute"
          right={0}
          rounded="full"
          top={0}
          w={4}
        >
          {invites.length}
        </Flex>
      ) : null}
    </Box>
  );
};
