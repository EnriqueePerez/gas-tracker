/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

interface NewGasDischargeForm {
  unit: string | undefined;
}

export const NewGasDischarge = () => {
  const [formData, setFormData] = useState<NewGasDischargeForm>({
    unit: undefined,
  });

  const handleInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const defineMaxTankWeight = () => {
    switch (formData.unit) {
      case 'Conservación 1':
        return 4;
      case 'Conservación 2':
        return 5;
      case 'Cerveza':
      case 'Hielo':
        return 3.5;
      case 'Koxka':
      case 'Salchikoxka':
        return 1.1;
      case 'Vitrina':
      case 'Imbera':
      case 'Enfriador de cargas':
        return 0.5;
      default:
        return 0;
    }
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
      <FormControl isDisabled={!formData.unit} marginY="4">
        <FormLabel htmlFor="tankWeight">Peso actual de la boya (kg)</FormLabel>
        <NumberInput max={defineMaxTankWeight()} min={0}>
          <NumberInputField id="amount" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
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
