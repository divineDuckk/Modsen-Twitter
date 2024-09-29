import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';
import { TweetCreationInfo, TweetInfo } from '@/interfaces/tweet';
import { formatDate } from '@/utils/functions/formatDate';

export const addTweetToDb = async ({
  imageUrl,
  photoURL,
  tweetText,
  userId,
  userName,
}: TweetCreationInfo) => {
  try {
    const userRef = doc(fireStore, 'users', userId);
    const userDoc = await getDoc(userRef);
    const numberOfTweets = userDoc.data()?.numberOfTweets;

    await updateDoc(userRef, { numberOfTweets: numberOfTweets + 1 });
    const tweetRef = await addDoc(collection(fireStore, 'tweets'), {
      text: tweetText,
      imageUrl: imageUrl,
      createdAt: new Date(),
      userId: userId,
      likes: 0,
      userLikes: [],
      authorName: userName,
      authorPhoto: photoURL,
    });
    const tweetDoc = await getDoc(doc(fireStore, 'tweets', tweetRef.id));
    const createdAtInfo = tweetDoc.data()?.createdAt.toDate();
    return {
      ...tweetDoc.data(),
      createdAt: formatDate(createdAtInfo),
      id: tweetDoc.id,
    } as TweetInfo;
  } catch (error) {
    throw new Error(error as string);
  }
};
