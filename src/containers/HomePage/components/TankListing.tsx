import {
  Box,
  BoxProps,
  Table,
  TableCaption,
  Tbody,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';

import { Td, TdActions, Th } from '../../../components/libs';
import { ITank } from '../../../hooks/useTanks';
import { HEADERS } from '../helpers';

export interface ITankListingProps extends BoxProps {
  /**
   * Data retrieved from the API.
   */
  tanks?: ITank[];
}

export const TankListing: React.FC<ITankListingProps> = (
  props,
): JSX.Element => {
  const { tanks = [], ...rest } = props;

  const { data: user } = useUser();

  const navigate = useNavigate();

  const toast = useToast();

  const handleOnTransfer = useCallback(
    (tank: ITank) => {
      if (Number(user?.uid) === tank?.owner_id) {
        navigate('/transfer-tank', { state: { tank_id: tank?.id } });
      } else {
        const description = 'Solo puedes transferir boyas de tu propiedad!';
        toast({ description, status: 'error' });
      }
    },
    [user],
  );

  const handleOnNewRegistry = useCallback(
    (tank: ITank) => {
      if (Number(user?.uid) === tank?.owner_id) {
        navigate('/create-gas-discharge', {
          state: { tank: { ...tank }, tank_id: tank?.id },
        });
      } else {
        const description = 'Solo puedes modificar boyas de tu propiedad!';
        toast({ description, status: 'error' });
      }
    },
    [user],
  );

  return (
    <Box {...rest}>
      <Table size="sm" variant="simple">
        <Thead position="sticky" top={0}>
          <Tr>
            {HEADERS.map((item) => (
              <Th key={nanoid()}>{item}</Th>
            ))}
            <Th />
          </Tr>
        </Thead>
        {tanks?.map((tank) => (
          <Tbody key={tank?.id}>
            <Tr position="relative">
              <Td>{tank?.id}</Td>
              <Td>{tank?.owner_name}</Td>
              <Td>{tank?.refrigerant}</Td>
              <Td>{tank?.tank_weight}</Td>
              <Td>
                {new Date(tank?.registered_at as string).toLocaleString()}
              </Td>
              <TdActions
                onInfo={() =>
                  navigate('/tank-info', { state: { tank_id: tank?.id } })
                }
                onNewRegistry={() => handleOnNewRegistry(tank)}
                onTransfer={() => handleOnTransfer(tank)}
              />
            </Tr>
          </Tbody>
        ))}
        <TableCaption>Boyas en Tránsito</TableCaption>
      </Table>
    </Box>
  );
};

TankListing.defaultProps = {
  overflow: 'scroll',
  position: 'relative',
};
