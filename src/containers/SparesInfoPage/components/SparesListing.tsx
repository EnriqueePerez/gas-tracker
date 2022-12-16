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
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';

import { Td, TdActions, Th } from '../../../components/libs';
import { ISpare } from '../../../hooks/useSpares';
import { HEADERS } from '../helpers';

export interface ISparesListingProps extends BoxProps {
  /**
   * Data retrieved from the API.
   */
  spares?: ISpare[];
}

export const SparesListing: React.FC<ISparesListingProps> = (
  props,
): JSX.Element => {
  const { spares = [], ...rest } = props;

  const { data: user } = useUser();

  const navigate = useNavigate();

  const handleOnUpdate = useCallback(
    (spare: ISpare) => {
      navigate('/update-spare', { state: { spare } });
    },
    [user],
  );

  const setColor = useCallback(
    (spare: ISpare) => {
      let color = 'unset';
      if (spare.is_delayed === 'Sí') {
        color = 'red.500';
      }

      if (spare.service_sheet === 'Si') {
        color = 'green.500';
      }
      return color;
    },
    [user],
  );

  return (
    <Box overflow="scroll" w="100%" {...rest}>
      <Table size="sm" variant="simple">
        <Thead position="sticky" top={0}>
          <Tr>
            {HEADERS.map((item) => (
              <Th key={nanoid()}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        {spares?.map((spare) => (
          <Tbody key={spare?.id}>
            <Tr position="relative">
              <Td>{spare?.store}</Td>
              <Td>{spare?.registrant_name}</Td>
              <Td>{spare?.folio}</Td>
              <Td
                color={setColor(spare)}
                minWidth="300px"
                whiteSpace="pre-wrap"
              >
                {spare?.name}
              </Td>
              <Td>{spare?.unit}</Td>
              <Td>{spare.store_manager ? spare.store_manager : 'S/D'}</Td>
              <Td>{spare.supplier ? spare.supplier : 'S/D'}</Td>
              <Td>
                {spare.created_at
                  ? new Date(spare?.created_at).toLocaleDateString()
                  : 'S/D'}
              </Td>
              <Td>
                {spare.request_date
                  ? new Date(spare?.request_date).toLocaleDateString()
                  : 'S/D'}
              </Td>
              <Td>
                {spare.authorization_date
                  ? new Date(spare?.authorization_date).toLocaleDateString()
                  : 'S/D'}
              </Td>
              <Td>
                {spare.reception_date
                  ? new Date(spare?.reception_date).toLocaleDateString()
                  : 'S/D'}
              </Td>
              <Td>
                {spare.installation_date
                  ? new Date(spare?.installation_date).toLocaleDateString()
                  : 'S/D'}
              </Td>
              <Td>{spare.service_sheet ? 'Si' : 'S/D'}</Td>
              <TdActions onUpdateSpare={() => handleOnUpdate(spare)} />
            </Tr>
          </Tbody>
        ))}
        <Thead position="sticky" top={0}>
          <Tr>
            {HEADERS.map((item) => (
              <Th key={nanoid()}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <TableCaption>Refacciones</TableCaption>
      </Table>
    </Box>
  );
};

SparesListing.defaultProps = {
  overflow: 'scroll',
  position: 'relative',
};
