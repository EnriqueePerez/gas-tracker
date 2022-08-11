import {
  Box,
  BoxProps,
  Table,
  TableCaption,
  Tbody,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';

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
                onInfo={() => console.log('info')}
                onNewRegistry={() => console.log('new registry')}
                onTransfer={() => console.log('transfer')}
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
