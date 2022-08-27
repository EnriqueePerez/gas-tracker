import { useState } from 'react';
import env from 'react-dotenv';

export interface IStore {
  /**
   * Identifier of the store.
   */
  id: string | null;
  /**
   * Name of the store.
   */
  name: string | null;
}

export const useStores = () => {
  const [stores, setStores] = useState<IStore[]>();

  const lookForStoresOnLocalStorage = () => {
    const tiendas = localStorage.getItem('stores');
    return tiendas;
  };

  const getNewUpdateStoresDate = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const newDate = new Date(year, month + 1, 1).toString();
    localStorage.setItem('dateToUpdateStores', newDate);
    return newDate;
  };

  const doesStoresNeedToBeUpdated = () => {
    const localStorageDate = new Date(
      localStorage.getItem('dateToUpdateStores') as string,
    ).getTime();
    const actualDate = new Date().getTime();

    if (actualDate >= localStorageDate) {
      return true;
    }
    return false;
  };

  const getStores = async () =>
    new Promise((resolve: (data: Promise<IStore[]>) => void, reject) => {
      if (lookForStoresOnLocalStorage() !== null) {
        if (doesStoresNeedToBeUpdated()) {
          fetch(`${env.API_URL}/stores`)
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem('stores', JSON.stringify(data));
              getNewUpdateStoresDate();
              setStores(data);
              resolve(data);
            })
            .catch((err) => {
              reject(err);
              console.error(err);
            });
        }
        setStores(JSON.parse(lookForStoresOnLocalStorage() as string));
        resolve(JSON.parse(lookForStoresOnLocalStorage() as string));
      } else {
        fetch(`${env.API_URL}/stores`)
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem('stores', JSON.stringify(data));
            getNewUpdateStoresDate();
            setStores(data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
            console.error(err);
          });
      }
    });

  return { getStores, stores };
};
