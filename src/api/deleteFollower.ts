import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { fireStore } from '@/firebase';

export const deleteFollower = async (userId: string, myId: string) => {
  try {
    const userDocRef = doc(fireStore, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    let updatedUserData;

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      updatedUserData = {
        ...userData,
        numberOfFollowers: userData.numberOfFollowers - 1,
        followers: userData.followers.filter(
          (followerId: string) => followerId !== myId,
        ),
      };

      await updateDoc(userDocRef, {
        numberOfFollowers: updatedUserData.numberOfFollowers,
        followers: updatedUserData.followers,
      });
    }

    const myDocRef = doc(fireStore, 'users', myId);
    const myDocSnap = await getDoc(myDocRef);
    let updatedMyData;

    if (myDocSnap.exists()) {
      const myData = myDocSnap.data();

      updatedMyData = {
        ...myData,
        numberOfFollowings: myData.numberOfFollowings - 1,
        followings: myData.followings.filter(
          (followingId: string) => followingId !== userId,
        ),
      };

      await updateDoc(myDocRef, {
        numberOfFollowings: updatedMyData.numberOfFollowings,
        followings: updatedMyData.followings,
      });
    }

    return {
      updatedUser: updatedUserData,
      updatedMyData: updatedMyData,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};
