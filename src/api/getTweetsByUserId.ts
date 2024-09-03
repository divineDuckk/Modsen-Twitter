import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { fireStore } from '@/firebase';
import { TweetInfo } from '@/interfaces/tweet';
import { formatDate } from '@/utils/functions/formatDate';

export const getTweetsByUserId = async (
  uid: string,
  pageSize: number,
  lastVisible: any = null,
): Promise<{
  tweets: TweetInfo[];
  lastVisible: any;
  hasMore: boolean;
}> => {
  try {
    const tweetsRef = collection(fireStore, 'tweets');

    const tweetsQuery = lastVisible
      ? query(
          tweetsRef,
          where('userId', '==', uid),
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(pageSize),
        )
      : query(
          tweetsRef,
          where('userId', '==', uid),
          orderBy('createdAt', 'desc'),
          limit(pageSize),
        );
    const querySnapshot = await getDocs(tweetsQuery);

    const lastTweet = querySnapshot.docs[querySnapshot.docs.length - 1];

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
    const hasMore = querySnapshot.docs.length === pageSize;

    return { tweets, lastVisible: lastTweet, hasMore };
  } catch (error) {
    throw new Error(error as string);
  }
};
