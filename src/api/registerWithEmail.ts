import { createUserWithEmailAndPassword } from 'firebase/auth';
<<<<<<< HEAD
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, fireStore } from '@/firebase';
import { UserInfo } from '@/interfaces/user';
import defaultBg from '@/assets/defaultBg.png';
=======
import { addDoc, collection } from 'firebase/firestore';

import { auth, fireStore } from '@/firebase';
import { UserInfo } from '@/interfaces/user';
>>>>>>> 3e7b7c77233fe2af37fcff43c9c70bb676dcafe3

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
<<<<<<< HEAD
    const usersRef = collection(fireStore, 'users');
    await setDoc(doc(usersRef, user.uid), {
=======
    await addDoc(collection(fireStore, 'users'), {
>>>>>>> 3e7b7c77233fe2af37fcff43c9c70bb676dcafe3
      uid: user.uid,
      displayName: name,
      email: email,
      photoURL: user.photoURL,
      birthDate: birthDate,
      phoneNumber: phoneNumber,
<<<<<<< HEAD
      tweetsNumber: 0,
      followers: 0,
      followings: 0,
      backgroundUrl: defaultBg,
    });
    const userDoc = await getDoc(doc(usersRef, user.uid));
    return userDoc.data();
=======
    });
    return user;
>>>>>>> 3e7b7c77233fe2af37fcff43c9c70bb676dcafe3
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};
