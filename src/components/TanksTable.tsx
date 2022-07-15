import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { useTanks } from '../hooks/useTanks';

export const TanksTable = () => {
  const { getTanks, tanks } = useTanks();

  useEffect(() => {
    const fetchTanks = async () => {
      await getTanks();
      console.log('aqui estan los tanks', tanks);
    };
    fetchTanks();
  }, []);

  return (
    <TableContainer>
      <Table size="sm" variant="simple">
        <TableCaption>Boyas en tránsito</TableCaption>
        <Thead>
          <Tr>
            <Th>Número de Serie</Th>
            <Th>Dueño actual de la boya</Th>
            <Th>Refrigerante</Th>
            <Th>Peso actual de la boya</Th>
            <Th>Fecha de registro</Th>
          </Tr>
        </Thead>
        {tanks &&
          tanks.map((tank) => (
            <Tbody key={tank.id}>
              <Tr>
                <Td>{tank.id}</Td>
                <Td>{tank.owner_name}</Td>
                <Td>{tank.refrigerant}</Td>
                <Td isNumeric>{tank.tank_weight}</Td>
                <Td>
                  {new Date(tank.registered_at as string).toLocaleString()}
                </Td>
              </Tr>
            </Tbody>
          ))}
        <Tfoot>
          <Tr>
            <Th>Número de Serie</Th>
            <Th>Dueño actual de la boya</Th>
            <Th>Refrigerante</Th>
            <Th>Peso actual de la boya</Th>
            <Th>Fecha de registro</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
