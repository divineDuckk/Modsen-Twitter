import { doc, deleteDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';

export const deleteTweetFromDb = async (id: string) => {
  try {
    const tweetRef = doc(fireStore, 'tweets', id);
    await deleteDoc(tweetRef);
  } catch (error) {
    throw new Error(error as string);
  }
};
