import { collection, getDocs } from 'firebase/firestore';

import { fireStore } from '@/firebase';
import { User } from '@/interfaces/user';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersCollectionRef = collection(fireStore, 'users');
    const querySnapshot = await getDocs(usersCollectionRef);

    const users: User[] = querySnapshot.docs.map(doc => ({
      ...(doc.data() as User),
    }));

    return users;
  } catch (error) {
    throw new Error(error as string);
  }
};
