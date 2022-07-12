/* eslint-disable no-console */
import { useState } from 'react';
import env from 'react-dotenv';

interface Tank {
  id: string;
  owner_id: number;
  refrigerant: string;
  tankWeight: number;
  registered_at?: string;
  status?: string;
}

export const useTanks = () => {
  const [tanks, setTanks] = useState<Tank[]>();

  const postTank = (tank: Tank) => {
    fetch(`${env.API_URL}/tanks`, {
      body: JSON.stringify(tank),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const getTanks = () => {
    fetch(`${env.API_URL}/tanks`)
      .then((res) => res.json())
      .then((data) => setTanks(data))
      .catch((err) => console.log(err));
  };

  return { getTanks, postTank, tanks };
};
