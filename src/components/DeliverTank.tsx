/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';

export const DeliverTank = () => {
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
        Entrega de boya
      </Heading>
      <FormControl marginY="4">
        <FormLabel htmlFor="identifier">Identificador de boya</FormLabel>
        <Select
          name="identifier"
          onChange={handleInput}
          placeholder="Seleccione la boya"
        >
          <option>231234123</option>
          <option>3488592</option>
          <option>1238549</option>
          <option>1958943</option>
          <option>2595893</option>
        </Select>
        <FormHelperText>Seleccione la boya a entregar</FormHelperText>
      </FormControl>
      <FormControl marginY="4">
        <FormLabel htmlFor="newOwner">Receptor/Nuevo dueño</FormLabel>
        <Select
          name="newOwner"
          onChange={handleInput}
          placeholder="Seleccione el usuario"
        >
          <option>Enrique Pérez</option>
          <option>Mario Pérez</option>
          <option>Francisco Rodriguez</option>
        </Select>
        <FormHelperText>Usuario quien recibe la boya</FormHelperText>
      </FormControl>
    </Box>
  );
};
