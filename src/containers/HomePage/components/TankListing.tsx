import {
  Box,
  BoxProps,
  IconButton,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { BiTransfer } from 'react-icons/bi';
import { FaInfo, FaPlus } from 'react-icons/fa';

import { ITank } from '../../../hooks/useTanks';

// crear carpeta src/components/lib
// crear componente Th y hara extends de ChakraTh
// crear componente TdActions
// crear array de headers de la tabla.

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
            <Th py={4} whiteSpace="nowrap">
              Número de Serie
            </Th>
            <Th py={4} whiteSpace="nowrap">
              Dueño actual de la boya
            </Th>
            <Th py={4} whiteSpace="nowrap">
              Refrigerante
            </Th>
            <Th py={4} whiteSpace="nowrap">
              Peso actual de la boya
            </Th>
            <Th py={4} whiteSpace="nowrap">
              Fecha de registro
            </Th>
            <Th />
          </Tr>
        </Thead>
        {tanks?.map((tank) => (
          <Tbody key={tank.id}>
            <Tr position="relative">
              <Td py={4} whiteSpace="nowrap">
                {tank.id}
              </Td>
              <Td py={4} whiteSpace="nowrap">
                {tank.owner_name}
              </Td>
              <Td py={4} whiteSpace="nowrap">
                {tank.refrigerant}
              </Td>
              <Td isNumeric py={4} whiteSpace="nowrap">
                {tank.tank_weight}
              </Td>
              <Td py={4} whiteSpace="nowrap">
                {new Date(tank.registered_at as string).toLocaleString()}
              </Td>
              <Stack as={Td} isInline position="sticky" right={0} top={0}>
                {/* {onInfo ?  */}
                <IconButton
                  aria-label="tank-info"
                  colorScheme="facebook"
                  icon={<FaInfo />}
                  onClick={() => console.log(tank.id)}
                  size="sm"
                />
                {/* : null} */}

                {/* {onTransfer ?  */}
                <IconButton
                  aria-label="transfer-tank"
                  colorScheme="orange"
                  icon={<BiTransfer />}
                  onClick={() => console.log(tank.id)}
                  size="sm"
                />
                {/* : null} */}

                {/* {onNewRegistry ?  */}
                <IconButton
                  aria-label="new-gas-discharge"
                  colorScheme="green"
                  icon={<FaPlus />}
                  onClick={() => console.log(tank.id)}
                  size="sm"
                />
                {/* : null} */}
              </Stack>
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
