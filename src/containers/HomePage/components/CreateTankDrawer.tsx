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
import { useRef } from 'react';

import {
  CreateTankForm,
  ICreateTankFormValues,
} from '../../../components/forms';

export interface ICreateTankDrawerProps extends Omit<DrawerProps, 'children'> {
  /**
   * On create tank form submit hander.
   */
  onSubmit: (
    v: ICreateTankFormValues,
    h?: FormikHelpers<ICreateTankFormValues>,
  ) => void;
}

export const CreateTankDrawer = (
  props: ICreateTankDrawerProps,
): JSX.Element => {
  const { onSubmit, onClose, placement = 'right', ...rest } = props;

  const ref = useRef<FormikProps<ICreateTankFormValues>>(null);

  return (
    <Drawer onClose={onClose} placement={placement} {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Nueva boya</DrawerHeader>

        <DrawerBody>
          <CreateTankForm ref={ref} onSubmit={onSubmit} />
        </DrawerBody>

        <DrawerFooter as={Stack}>
          <Button
            colorScheme="gray"
            mb={2}
            onClick={onClose}
            size="sm"
            width="100%"
          >
            Cancel
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
