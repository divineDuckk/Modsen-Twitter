import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { fireStore } from '@/firebase';
import { TweetInfo } from '@/interfaces/tweet';

export const updateTweetsByUserId = async (
  userId: string,
  updates: Partial<TweetInfo>,
) => {
  try {
    const tweetsRef = collection(fireStore, 'tweets');
    const q = query(tweetsRef, where('userId', '==', userId));

    const querySnapshot = await getDocs(q);

    const updatePromises = querySnapshot.docs.map((docSnapshot) => {
      const tweetDocRef = doc(fireStore, 'tweets', docSnapshot.id);
      return updateDoc(tweetDocRef, updates);
    });

    await Promise.all(updatePromises);
  } catch (error) {
    throw new Error(error as string);
  }
};
