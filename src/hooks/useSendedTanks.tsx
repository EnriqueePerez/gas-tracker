/* eslint-disable no-console */
import { useState } from 'react';
import env from 'react-dotenv';

interface SendedTank {
  id?: string;
  tank_id: string;
  timedate: string;
  status: string;
  new_owner: number;
}

export const useSendedTanks = () => {
  const [sendedTanks, setSendedTanks] = useState<SendedTank[]>();

  const postSendedTank = (tank: SendedTank) => {
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

  const patchSendedTank = (tank: SendedTank) => {
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
