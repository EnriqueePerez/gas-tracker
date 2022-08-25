import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { IAcceptInviteFormValues } from '../../forms';
import { AcceptInviteForm } from '../../forms/AcceptInviteForm/AcceptInviteForm';

export interface IAcceptInviteModalProps {
  /**
   * State of the modal.
   */
  isOpen: boolean;
  /**
   * Handler for modal close.
   */
  onClose: () => void;
  /**
   * Handler to accept invite.
   */
  handleAcceptInvite: (v: IAcceptInviteFormValues) => Promise<void>;
}

export const AcceptInviteModal: React.FC<IAcceptInviteModalProps> = (props) => {
  const { isOpen, onClose, handleAcceptInvite, ...rest } = props;

  return (
    <Modal
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Aceptación de tranferencia</ModalHeader>
        <ModalBody>
          <Text mb={4}>
            Para aceptar la transferencia de la boya, por favor, ingresa tu
            contraseña
          </Text>
          <AcceptInviteForm id="auth" onSubmit={handleAcceptInvite} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="facebook" form="auth" mr={3} type="submit">
            Aceptar
          </Button>
          <Button onClick={onClose} variant="ghost">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
