import { addDoc, collection, doc, getDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';

export const addTweetToDb = async (
  tweetText: string,
  imageUrl: string,
  userId: string,
) => {
  try {
    const tweetRef = await addDoc(collection(fireStore, 'tweets'), {
      text: tweetText,
      imageUrl: imageUrl,
      createdAt: new Date(),
      userId: userId,
      likes: 0,
      userLikes: [],
    });
    const tweetDoc = await getDoc(doc(fireStore, 'tweets', tweetRef.id));
    return tweetDoc;
  } catch (error) {
    throw new Error(error as string);
  }
};
