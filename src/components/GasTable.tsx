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

export const GasTable = () => (
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
      <Tbody>
        <Tr>
          <Td>350343</Td>
          <Td>Enrique Pérez</Td>
          <Td>R404</Td>
          <Td isNumeric>9.8kg</Td>
          <Td>{new Date().toLocaleString()}</Td>
        </Tr>
        <Tr>
          <Td>123494</Td>
          <Td>Mario Pérez</Td>
          <Td>R22</Td>
          <Td isNumeric>11.5kg</Td>
          <Td>{new Date().toLocaleString()}</Td>
        </Tr>
        <Tr>
          <Td>96343</Td>
          <Td>Francisco Rodriguez</Td>
          <Td>R410</Td>
          <Td isNumeric>5.3kg</Td>
          <Td>{new Date().toLocaleString()}</Td>
        </Tr>
      </Tbody>
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
