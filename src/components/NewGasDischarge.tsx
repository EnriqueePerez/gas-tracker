/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

export const NewGasDischarge = () => {
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
        Nueva descarga de boya
      </Heading>
      <FormControl marginY="4">
        <FormLabel htmlFor="folio">Folio</FormLabel>
        <Input name="folio" onChange={handleInput} type="text" />
        <FormHelperText>
          Folio de la boya o &quot;Sobrecalentamiento&quot;
        </FormHelperText>
      </FormControl>
      <FormControl marginY="4">
        <FormLabel htmlFor="tienda">Tienda</FormLabel>
        <Input list="stores" name="stores" onChange={handleInput} type="text" />
        <datalist id="stores">
          <option>Coatzacoalcos</option>
          <option>Pajaritos</option>
          <option>Cardel</option>
          <option>Emiliano Zapata</option>
        </datalist>
        <FormHelperText>
          En caso de no encontrar la tienda en la lista, agreguela
        </FormHelperText>
      </FormControl>
      <FormControl marginY="4">
        <FormLabel htmlFor="unit">Equipo</FormLabel>
        <Select
          name="unit"
          onChange={handleInput}
          placeholder="Seleccione el equipo"
        >
          <option>Conservación 1</option>
          <option>Conservación 2</option>
          <option>Cerveza</option>
          <option>Hielo</option>
          <option>Koxka</option>
          <option>Salchikoxka</option>
          <option>Vitrina</option>
          <option>Imbera</option>
          <option>Enfriador de Corona</option>
        </Select>
        <FormHelperText>Equipo que recibio el gas</FormHelperText>
      </FormControl>
      <FormControl marginY="4">
        <FormLabel htmlFor="startHour">Hora de inicio de carga</FormLabel>
        <Input name="startHour" onChange={handleInput} type="time" />
        <FormHelperText>Hora en que se empezó a cargar el gas</FormHelperText>
      </FormControl>
      <FormControl marginY="4">
        {/* Revisar si tiene sentido agregar NumberInput para agregar algun max o min */}
        <FormLabel htmlFor="tankWeight">Peso actual de la boya (kg)</FormLabel>
        <Input id="tankWeight" onChange={handleInput} type="number" />
        <FormHelperText>
          Peso de la boya luego de cargar el gas al equipo, en kilos
        </FormHelperText>
      </FormControl>
      <FormControl marginY="4">
        <FormLabel htmlFor="comments">Comentarios</FormLabel>
        <Textarea
          name="comments"
          onChange={handleInput}
          placeholder="Comentarios adicionales en caso de ser necesarios"
        />
      </FormControl>
    </Box>
  );
};
