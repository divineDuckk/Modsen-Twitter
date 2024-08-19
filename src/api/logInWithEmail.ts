import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';

import { auth, fireStore } from '@/firebase';

export const logInWithEmail = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const usersRef = collection(fireStore, 'users');
    const userDoc = await getDoc(doc(usersRef, user.uid));
    return userDoc.data();
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};
