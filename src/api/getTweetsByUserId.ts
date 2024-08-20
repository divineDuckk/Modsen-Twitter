import { collection, getDocs, query, where } from 'firebase/firestore';

import { fireStore } from '@/firebase';
import { TweetInfo } from '@/interfaces/tweet';
import { formatDate } from '@/utils/functions/formatDate';

export const getTweetsByUserId = async (uid: string): Promise<TweetInfo[]> => {
  try {
    const tweetsRef = collection(fireStore, 'tweets');
    const q = query(tweetsRef, where('userId', '==', uid));
    const querySnapshot = await getDocs(q);

    const tweets: TweetInfo[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const createdAtTimestamp = data.createdAt;
      const createdAtDate = createdAtTimestamp.toDate();
      const formattedCreatedAt = formatDate(createdAtDate);

      return {
        id: doc.id,
        createdAt: formattedCreatedAt,
        imageUrl: data.imageUrl,
        likes: data.likes,
        text: data.text,
        userId: data.userId,
        userLikes: data.userLikes,
      };
    });

    return tweets;
  } catch (error) {
    throw new Error(error as string);
  }
};
