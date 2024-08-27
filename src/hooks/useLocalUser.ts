import { useEffect, useState } from 'react';

import { User } from '@/interfaces/user';
import { getUserByUserId } from '@/api/getUserByUserId';

export const useLocalUser = (id: string, initialUser: User) => {
  const [localUser, setLocalUser] = useState<User>(initialUser);
  const [isUserLoading, setIsUserLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      setIsUserLoading(true);
      const user = await getUserByUserId(id);
      setLocalUser(user!);
      setIsUserLoading(false);
    };
    getUser();
  }, [id]);
  return { localUser, setLocalUser, isUserLoading };
};
