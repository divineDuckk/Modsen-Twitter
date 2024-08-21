import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, fireStore } from '@/firebase';
import { UserInfo } from '@/interfaces/user';
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
      tweetsNumber: 0,
      followers: 0,
      followings: 0,
      backgroundUrl: defaultBg,
    });
    const userDoc = await getDoc(doc(usersRef, user.uid));
    return userDoc.data();
  } catch (error) {
    throw new Error(error as string);
  }
};
