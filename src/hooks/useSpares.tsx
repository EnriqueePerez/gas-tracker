/* eslint-disable no-console */
import { useState } from 'react';
import env from 'react-dotenv';

export interface ISpare {
  id?: string;
  registrant_name: string;
  name: string;
  folio: string;
  store: string;
  unit: string;
  created_at?: string;
  request_date?: string;
  store_manager?: string;
  authorization_date?: string;
  supplier?: string;
  reception_date?: string;
  installation_date?: string;
}

export const useSpares = () => {
  const [spares, setSpares] = useState<ISpare[]>();

  const postSpare = (spare: ISpare) =>
    fetch(`${env.API_URL}/spares`, {
      body: JSON.stringify(spare),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

  const getSpares = () =>
    fetch(`${env.API_URL}/spares`)
      .then((res) => res.json())
      .then((data) => {
        setSpares(data);
        return data;
      })
      .catch((err) => console.log(err));

  const patchSpare = (spare: Partial<ISpare>, spare_id: string) =>
    fetch(`${env.API_URL}/spares/${spare_id}`, {
      body: JSON.stringify(spare),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

  return {
    getSpares,
    patchSpare,
    postSpare,
    spares,
  };
};
