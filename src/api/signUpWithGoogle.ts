import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth, fireStore } from '@/firebase';
import defaultBg from '@/assets/defaultBg.png';

export const signUpWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    const usersRef = collection(fireStore, 'users');
    const q = query(usersRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await setDoc(doc(usersRef, user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        followers: 0,
        followings: 0,
        backgroundUrl: defaultBg,
        description: '',
        birthDate: '',
        phone: '',
        numberOfTweets: 0,
      });
    }
    const userDoc = await getDoc(doc(usersRef, user.uid));
    return userDoc.data();
  } catch (error) {
    throw new Error(error as string);
  }
};
