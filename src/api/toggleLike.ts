import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';

export const toggleLike = async (
  tweetId: string,
  hasLiked: boolean,
  userId: string,
) => {
  try {
    const tweetRef = doc(fireStore, 'tweets', tweetId);
    const tweetDoc = await getDoc(tweetRef);

    if (tweetDoc.exists()) {
      const tweetData = tweetDoc.data();
      const userLikes = tweetData.userLikes || [];

      const updatedUserLikes = hasLiked
        ? userLikes.filter((id: string) => id !== userId)
        : [...userLikes, userId];

      await updateDoc(tweetRef, {
        likes: hasLiked ? userLikes.length - 1 : userLikes.length + 1,
        userLikes: updatedUserLikes,
      });
    }
  } catch (error) {
    throw new Error(error as string);
  }
};
