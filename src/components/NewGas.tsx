/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Tank, useTanks } from '../hooks/useTanks';

export const NewGas = () => {
  const [formData, setFormData] = useState<Tank>({
    id: null,
    owner_id: null,
    owner_name: null,
    refrigerant: null,
    tankWeight: null,
  });
  const { postTank } = useTanks();

  const handleInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('formData', formData);
    await postTank(formData);
  };

  return (
    <Box>
      <Heading marginBottom="10" textAlign="center">
        Nueva boya
      </Heading>
      <FormControl marginY="4">
        <FormLabel htmlFor="id">Identificador o serie</FormLabel>
        <Input name="id" onChange={handleInput} type="text" />
        <FormHelperText>Identificador o serie de la boya</FormHelperText>
      </FormControl>
      <FormControl marginY="4">
        <FormLabel htmlFor="refrigerant">Refrigerante</FormLabel>
        <Select
          name="refrigerant"
          onChange={handleInput}
          placeholder="Seleccione el equipo"
        >
          <option>R22</option>
          <option>R134</option>
          <option>R404</option>
          <option>R410</option>
          <option>R449</option>
        </Select>
        <FormHelperText>Refrigerante de la boya</FormHelperText>
      </FormControl>
      <FormControl marginY="4">
        <FormLabel htmlFor="tankWeight">Peso de la boya (kg)</FormLabel>
        <Input name="tankWeight" onChange={handleInput} type="number" />
        <FormHelperText>Peso de la boya, en kilos</FormHelperText>
      </FormControl>
      <Button
        colorScheme="blue"
        isDisabled={
          !formData.id || !formData.refrigerant || !formData.tankWeight
        }
        justifySelf="center"
        maxWidth="300px"
        onClick={handleSubmit}
        width="80%"
      >
        Registrar boya
      </Button>
    </Box>
  );
};
