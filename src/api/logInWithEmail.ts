import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/firebase';

export const logInWithEmail = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};
