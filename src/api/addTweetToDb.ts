import { addDoc, collection } from 'firebase/firestore';

import { fireStore } from '@/firebase';

export const addTweetToDb = async (
  tweetText: string,
  imageUrl: string,
  userId: string,
) => {
  try {
    await addDoc(collection(fireStore, 'tweets'), {
      text: tweetText,
      imageUrl: imageUrl,
      createdAt: new Date(),
      userId: userId,
      likes: 0,
      userLikes: [],
    });
  } catch (error) {
    throw new Error(error as string);
  }
};
