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
   * Shortened name of the user.
   */
  shortenedName: string | null;
  /**
   * Last name of the user.
   */
  lastName: string | null;
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
        .then((data: IUser[]) => {
          const parsedUsers = data;
          for (let i = 0; i < data.length; i += 1) {
            const { name } = parsedUsers[i];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const index = parsedUsers.findIndex((n: any) => n.nombre === name);
            if (index !== i) {
              parsedUsers[i].shortenedName = `${name} ${parsedUsers[
                i
              ].lastName?.charAt(0)}`;
              parsedUsers[index].shortenedName = `${name} ${parsedUsers[
                index
              ].lastName?.charAt(0)}`;
            }
          }

          setUsers(parsedUsers);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  return { getUsers, users };
};
