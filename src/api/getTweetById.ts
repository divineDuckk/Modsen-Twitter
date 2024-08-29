import { doc, getDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';
import { TweetInfo } from '@/interfaces/tweet';
import { formatDate } from '@/utils/functions/formatDate';

export const getTweetById = async (id: string): Promise<TweetInfo | null> => {
  try {
    const tweetDocRef = doc(fireStore, 'tweets', id);

    const docSnapshot = await getDoc(tweetDocRef);

    const tweetInfo = docSnapshot.data() as TweetInfo;
    const createdAtInfo = docSnapshot.data()?.createdAt.toDate();

    if (docSnapshot.exists()) {
      return {
        ...tweetInfo,
        createdAt: formatDate(createdAtInfo),
      };
    }
    return null;
  } catch (error) {
    throw new Error(error as string);
  }
};
