import { doc, updateDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';
import { User } from '@/interfaces/user';

export const updateUserInfo = async (uid: string, updates: Partial<User>) => {
  try {
    const userRef = doc(fireStore, 'users', uid);

    await updateDoc(userRef, updates);
  } catch (error) {
    throw new Error(error as string);
  }
};
