import { IconButton, Stack, StackProps, Td } from '@chakra-ui/react';
import { BiTransfer } from 'react-icons/bi';
import { FaInfo, FaPlus, FaUpload } from 'react-icons/fa';

export interface ITdActionsProps extends StackProps {
  /**
   * Redirects to the detail page of the tank.
   */
  onInfo?: () => void;
  /**
   * Redirects to the transfer page.
   */
  onTransfer?: () => void;
  /**
   * Redirects to the add discharge page.
   */
  onNewRegistry?: () => void;
  /**
   * Redirects to the update spare page.
   */
  onUpdateSpare?: () => void;
}

export const TdActions: React.FC<ITdActionsProps> = (props): JSX.Element => {
  const { onInfo, onTransfer, onNewRegistry, onUpdateSpare, ...rest } = props;

  return (
    <Stack as={Td} {...rest}>
      {onInfo ? (
        <IconButton
          aria-label="tank-info"
          colorScheme="facebook"
          icon={<FaInfo />}
          onClick={onInfo}
          size="sm"
        />
      ) : null}

      {onTransfer ? (
        <IconButton
          aria-label="transfer-tank"
          colorScheme="orange"
          icon={<BiTransfer />}
          onClick={onTransfer}
          size="sm"
        />
      ) : null}

      {onNewRegistry ? (
        <IconButton
          aria-label="new-gas-discharge"
          colorScheme="green"
          icon={<FaPlus />}
          onClick={onNewRegistry}
          size="sm"
        />
      ) : null}

      {onUpdateSpare ? (
        <IconButton
          aria-label="update-spare"
          colorScheme="green"
          icon={<FaUpload />}
          onClick={onUpdateSpare}
          size="sm"
        />
      ) : null}
    </Stack>
  );
};

TdActions.defaultProps = {
  isInline: true,
  position: 'sticky',
  right: 0,
  top: 0,
};
