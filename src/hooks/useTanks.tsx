/* eslint-disable no-console */
import { useState } from 'react';
import env from 'react-dotenv';

export interface Tank {
  id: string | null;
  owner_id: number | null;
  owner_name: string | null;
  refrigerant: string | null;
  tankWeight: number | null;
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
