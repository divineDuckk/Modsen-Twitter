import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

import { fireStore } from '@/firebase';
import { TweetInfo } from '@/interfaces/tweet';
import { formatDate } from '@/utils/functions/formatDate';

export const getAllTweets = async (
  pageSize: number,
): Promise<{
  tweets: TweetInfo[];
  hasMore: boolean;
}> => {
  try {
    const tweetsCollectionRef = collection(fireStore, 'tweets');

    const maxTweets = (await getDocs(tweetsCollectionRef)).docs.length;
    if (!maxTweets) return { tweets: [], hasMore: false };

    const tweetsQuery = query(
      tweetsCollectionRef,
      orderBy('createdAt', 'desc'),
      limit(pageSize),
    );

    const tweetsSnapshot = await getDocs(tweetsQuery);

    const tweets: TweetInfo[] = tweetsSnapshot.docs.map((doc) => {
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
        authorName: data.authorName,
        authorPhoto: data.authorPhoto,
      };
    });
    const hasMore = maxTweets >= pageSize;
    return { tweets, hasMore };
  } catch (error) {
    throw new Error(error as string);
  }
};
