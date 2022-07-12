import { useState } from 'react';
import env from 'react-dotenv';

interface GasDischarge {
  id?: string;
  comments: string;
  timedate_of_start: string;
  actual_tank_weight: number;
  owner_name: string;
  timedate: string;
  store: string;
  folio: string;
}

export const useGasDischarges = () => {
  const [gasDischarges, setGasDischarges] = useState<GasDischarge[]>();

  const postGasDischarge = (gasDischarge: GasDischarge, tankId: string) => {
    fetch(`${env.API_URL}/tanks/${tankId}/gas-discharge`, {
      body: JSON.stringify(gasDischarge),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const getGasDischarges = (tankId: string) => {
    fetch(`${env.API_URL}/tanks/${tankId}/gas-discharge`)
      .then((res) => res.json())
      .then((data) => setGasDischarges(data))
      .catch((err) => console.log(err));
  };

  return { gasDischarges, getGasDischarges, postGasDischarge };
};
