import { useEffect, useState } from 'react';

export type User = {
  id: number;
  email: string;
  username: string;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    let shouldUpdate = true;

    (async function fetchData() {
      const users = await fetchUsers();
      if (shouldUpdate) {
        setUsers(users);
      }
    })();

    return () => {
      shouldUpdate = false;
    };
  }, []);

  return users;
};
