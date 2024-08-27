import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';

export const deleteTweetFromDb = async (id: string, userId: string) => {
  try {
    const userRef = doc(fireStore, 'users', userId);
    const userDoc = await getDoc(userRef);
    const numberOfTweets = userDoc.data()?.numberOfTweets;

    await updateDoc(userRef, { numberOfTweets: numberOfTweets - 1 });
    const tweetRef = doc(fireStore, 'tweets', id);
    await deleteDoc(tweetRef);
  } catch (error) {
    throw new Error(error as string);
  }
};
