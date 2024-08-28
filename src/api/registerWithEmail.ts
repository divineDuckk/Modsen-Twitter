import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, fireStore } from '@/firebase';
import { User, UserInfo } from '@/interfaces/user';
import defaultAvatar from '@/assets/avatar.png';
import defaultBg from '@/assets/defaultBg.png';

export const registerWithEmail = async ({
  birthDate,
  email,
  name,
  password,
  phoneNumber,
}: UserInfo) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const usersRef = collection(fireStore, 'users');
    await setDoc(doc(usersRef, user.uid), {
      uid: user.uid,
      displayName: name,
      email: email,
      photoURL: defaultAvatar,
      birthDate: birthDate,
      phone: phoneNumber,
      followers: [],
      followings: [],
      backgroundUrl: defaultBg,
      numberOfTweets: 0,
      numberOfFollowers: 0,
      numberOfFollowings: 0,
    });
    await sendEmailVerification(user);
    const userDoc = await getDoc(doc(usersRef, user.uid));
    const userInfo: User = {
      ...(userDoc.data() as Omit<User, 'password'>),
      password,
    };
    return userInfo;
  } catch (error) {
    throw new Error(error as string);
  }
};
