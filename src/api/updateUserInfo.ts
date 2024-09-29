import { doc, updateDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';
import { User } from '@/interfaces/user';

import { updateTweetsByUserId } from './updateTweetsByUserId';

export const updateUserInfo = async (uid: string, updates: Partial<User>) => {
  try {
    const userRef = doc(fireStore, 'users', uid);
    const { photoURL, displayName } = updates;
    if (photoURL || displayName) {
      await updateTweetsByUserId(uid, {
        authorName: displayName,
        authorPhoto: photoURL,
      });
    }
    await updateDoc(userRef, updates);
  } catch (error) {
    throw new Error(error as string);
  }
};
