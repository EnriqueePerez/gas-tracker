import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Stack,
} from '@chakra-ui/react';
import { FormikHelpers, FormikProps } from 'formik';
import { useEffect, useRef } from 'react';

import {
  IRegisterSpareFormValues,
  RegisterSpareForm,
} from '../../../components/forms';
import { useStores } from '../../../hooks/useStores';

export interface IRegisterSpareDrawerProps
  extends Omit<DrawerProps, 'children'> {
  /**
   * On register spare form submit hander.
   */
  onSubmit: (
    v: IRegisterSpareFormValues,
    h?: FormikHelpers<IRegisterSpareFormValues>,
  ) => void;
}

export const RegisterSpareDrawer = (
  props: IRegisterSpareDrawerProps,
): JSX.Element => {
  const { onSubmit, onClose, placement = 'right', ...rest } = props;
  const { getStores, stores } = useStores();

  const ref = useRef<FormikProps<IRegisterSpareFormValues>>(null);

  useEffect(() => {
    const fetchStores = async () => {
      await getStores();
    };
    fetchStores();
  }, []);

  return (
    <Drawer onClose={onClose} placement={placement} {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Nueva Refacción</DrawerHeader>

        <DrawerBody>
          <RegisterSpareForm ref={ref} onSubmit={onSubmit} stores={stores} />
        </DrawerBody>

        <DrawerFooter as={Stack}>
          <Button
            colorScheme="gray"
            mb={2}
            onClick={onClose}
            size="sm"
            width="100%"
          >
            Cancelar
          </Button>

          <Button
            colorScheme="facebook"
            form="create-tank-form"
            size="sm"
            type="submit"
            width="100%"
          >
            Registrar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
