import {
  Box,
  Button,
  ButtonGroup,
  ChakraProvider,
  Code,
  Grid,
  Heading,
  Link,
  Text,
  theme,
  VStack,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { NewGasDischarge } from './components/NewGasDischarge';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box p={5}>
      <NewGasDischarge />
    </Box>
    {/* <Box fontSize="xl" textAlign="center">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Heading as="h1" size="lg">
          Boyas Activas
        </Heading>
        <GasTable />
        <Button
          colorScheme="blue"
          justifySelf="center"
          maxWidth="300px"
          width="80%"
        >
          Añadir boya
        </Button>
        <Button
          colorScheme="blue"
          justifySelf="center"
          maxWidth="300px"
          width="80%"
        >
          Añadir registro a boyas
        </Button>
        <VStack spacing={8} />
      </Grid>
    </Box> */}
  </ChakraProvider>
);
