import { collection, getDocs } from 'firebase/firestore';

import { TweetInfo } from '@/interfaces/tweet';
import { fireStore } from '@/firebase';
import { formatDate } from '@/utils/functions/formatDate';

export const getAllTweets = async (): Promise<TweetInfo[]> => {
  try {
    const tweetsCollectionRef = collection(fireStore, 'tweets');

    const querySnapshot = await getDocs(tweetsCollectionRef);

    if (querySnapshot.empty) {
      return [];
    }

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
