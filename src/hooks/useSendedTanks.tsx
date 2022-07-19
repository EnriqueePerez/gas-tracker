/* eslint-disable no-console */
import { useState } from 'react';
import env from 'react-dotenv';

export interface ISendedTank {
  id?: string;
  tank_id: string;
  status?: string;
  new_owner_name: string;
  new_owner_id: number;
}

export const useSendedTanks = () => {
  const [sendedTanks, setSendedTanks] = useState<ISendedTank[]>();

  const postSendedTank = (tank: ISendedTank) => {
    fetch(`${env.API_URL}/sended-tanks`, {
      body: JSON.stringify(tank),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const getSendedTanks = () => {
    fetch(`${env.API_URL}/sended-tanks`)
      .then((res) => res.json())
      .then((data) => setSendedTanks(data))
      .catch((err) => console.log(err));
  };

  const patchSendedTank = (tank: ISendedTank) => {
    fetch(`${env.API_URL}/sended-tanks/${tank.id}`, {
      body: JSON.stringify(tank),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  return { getSendedTanks, patchSendedTank, postSendedTank, sendedTanks };
};
