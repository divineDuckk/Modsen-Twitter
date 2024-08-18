import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { auth, fireStore } from '@/firebase';

export const signUpWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    await addDoc(collection(fireStore, 'users'), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });

    return user;
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};
