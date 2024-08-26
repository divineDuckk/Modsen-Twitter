import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';

import { auth } from '@/firebase';

export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently signed in.');
    }
    const credential = EmailAuthProvider.credential(
      user.email!,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  } catch (error) {
    throw new Error(error as string);
  }
};
