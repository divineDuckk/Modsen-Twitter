import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { auth, fireStore } from '@/firebase';
import { UserInfo } from '@/interfaces/user';

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
    await addDoc(collection(fireStore, 'users'), {
      uid: user.uid,
      displayName: name,
      email: email,
      photoURL: user.photoURL,
      birthDate: birthDate,
      phoneNumber: phoneNumber,
    });
    return user;
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};
