/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';

export const NewGas = () => {
  const [formData, setFormData] = useState({});

  const handleInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Heading marginBottom="10" textAlign="center">
        Nueva boya
      </Heading>
      <FormControl marginY="4">
        <FormLabel htmlFor="identifier">Identificador o serie</FormLabel>
        <Input name="identifier" onChange={handleInput} type="text" />
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
    </Box>
  );
};
