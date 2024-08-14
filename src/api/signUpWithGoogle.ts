import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const signUpWithGoogle = async () => {
  try {
    const db = getFirestore();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
