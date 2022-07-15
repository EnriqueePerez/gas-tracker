/* eslint-disable no-console */
import { useState } from 'react';
import env from 'react-dotenv';

export interface ITank {
  /**
   * Identifier of the tank.
   */
  id: string | null;
  /**
   * Owner id of the tank.
   */
  owner_id: number | null;
  /**
   * Owner name of the tank.
   */
  owner_name: string | null;
  /**
   * Refrigerant of the tank.
   */
  refrigerant: string | null;
  /**
   * Date when the tank was created.
   */
  registered_at?: string;
  /**
   * Status of the tank.
   */
  status?: string;
  /**
   * Weight of the tank.
   */
  tank_weight: number | null;
}

export const useTanks = () => {
  const [tanks, setTanks] = useState<ITank[]>();

  const postTank = (tank: ITank) => {
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
