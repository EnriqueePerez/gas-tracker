import {
  Box,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BackButton, Layout } from '../../components/elements';
import { Td, Th } from '../../components/libs';
import { useGasDischarges } from '../../hooks/useGasDischarges';
import { HEADERS } from './helpers';

export const TankInfoPage = (): JSX.Element => {
  const { getGasDischarges, gasDischarges } = useGasDischarges();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getGasDischarges((state as { tank_id: string })?.tank_id);
  }, []);

  return (
    <Layout>
      <Heading>Detalles de la boya</Heading>
      <Heading size="sm">
        Boya: {(state as { tank_id: string })?.tank_id}
      </Heading>

      <Box mt={8} overflow="scroll" w="100%">
        <Table size="sm" variant="simple">
          <Thead position="sticky" top={0}>
            <Tr>
              {HEADERS.map((item) => (
                <Th key={nanoid()}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          {gasDischarges?.map((gd) => (
            <Tbody key={gd?.id}>
              <Tr position="relative">
                <Td>{gd?.folio}</Td>
                <Td>{gd?.owner_name}</Td>
                <Td>{gd?.store}</Td>
                <Td>{gd?.actual_tank_weight}</Td>
                <Td>{new Date(gd?.timedate_of_start).toLocaleString()}</Td>
                <Td>{new Date(gd?.timedate as string).toLocaleString()}</Td>
                <Td>{gd?.comments}</Td>
              </Tr>
            </Tbody>
          ))}
          <TableCaption>Descargas de la boya</TableCaption>
        </Table>
      </Box>

      <BackButton onClick={() => navigate('/', { state: {} })} />
    </Layout>
  );
};
