import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { fireStore } from '@/firebase';
import { TweetInfo } from '@/interfaces/tweet';
import { formatDate } from '@/utils/functions/formatDate';
import { lastVisibleTweetType } from '@/types';

export const getAllTweets = async (
  pageSize: number,
  lastVisible: lastVisibleTweetType = null,
): Promise<{
  tweets: TweetInfo[];
  lastVisible: lastVisibleTweetType;
  hasMore: boolean;
}> => {
  try {
    const tweetsCollectionRef = collection(fireStore, 'tweets');

    const maxTweets = (await getDocs(tweetsCollectionRef)).docs.length;
    if (maxTweets === 0)
      return { tweets: [], lastVisible: null, hasMore: false };

    const tweetsQuery = lastVisible
      ? query(
          tweetsCollectionRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(pageSize),
        )
      : query(
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

    const lastTweet = tweetsSnapshot.docs[tweetsSnapshot.docs.length - 1];
    const hasMore = tweetsSnapshot.docs.length === pageSize;

    return { tweets, lastVisible: lastTweet, hasMore };
  } catch (error) {
    throw new Error(error as string);
  }
};
