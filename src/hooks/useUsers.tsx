/* eslint-disable no-console */
import { useState } from 'react';
import env from 'react-dotenv';

export interface IUser {
  /**
   * Identifier of the user.
   */
  id: string | null;
  /**
   * Name of the user.
   */
  name: string | null;
  /**
   * Last name of the user.
   */
  lastName: number | null;
  /**
   * Email of the user.
   */
  email: string | null;
  /**
   * Role of the user
   */
  role: string | null;
}

export const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = (): Promise<IUser[]> =>
    new Promise((resolve, reject) => {
      fetch(`${env.API_URL}/users`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  return { getUsers, users };
};
