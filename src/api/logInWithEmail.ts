import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';

import { auth, fireStore } from '@/firebase';
import { User } from '@/interfaces/user';

export const logInWithEmail = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const usersRef = collection(fireStore, 'users');
    const userDoc = await getDoc(doc(usersRef, user.uid));
    const userData = userDoc.data();

    if (userData) {
      const user: User = { ...(userData as Omit<User, 'password'>), password };
      return user;
    }

    return userData;
  } catch (error) {
    throw new Error(error as string);
  }
};
