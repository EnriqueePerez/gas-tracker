import { IconButton } from '@chakra-ui/react';
import { FaWrench } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const SparesSectionButton: React.FC = (props) => {
  const navigate = useNavigate();

  return (
    <IconButton
      aria-label="Spares"
      icon={<FaWrench />}
      onClick={() => navigate('/spares')}
      position="absolute"
      right={40}
      top={4}
      variant="ghost"
      {...props}
    />
  );
};
