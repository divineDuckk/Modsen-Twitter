import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore';
import { fireStore } from '@/firebase';
import { TweetInfo } from '@/interfaces/tweet';
import { formatDate } from '@/utils/functions/formatDate';

export const getTweetsByUserId = async (
  uid: string,
  pageSize: number,
): Promise<{
  tweets: TweetInfo[];
  hasMore: boolean;
}> => {
  try {
    const tweetsRef = collection(fireStore, 'tweets');

    const tweetsQuery = query(
      tweetsRef,
      where('userId', '==', uid),
      orderBy('createdAt', 'desc'),
      limit(pageSize),
    );
    const maxTweetsQuery = query(tweetsRef, where('userId', '==', uid));
    const maxTweets = (await getDocs(maxTweetsQuery)).docs.length;

    const querySnapshot = await getDocs(tweetsQuery);
    const tweets: TweetInfo[] = querySnapshot.docs.map((doc) => {
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
