import { doc, getDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';
import { User } from '@/interfaces/user';

export const getUserByUserId = async (userId: string): Promise<User | null> => {
  try {
    const userDocRef = doc(fireStore, 'users', userId);

    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      return {
        ...(docSnapshot.data() as User),
      };
    }
    return null;
  } catch (error) {
    throw new Error(error as string);
  }
};
