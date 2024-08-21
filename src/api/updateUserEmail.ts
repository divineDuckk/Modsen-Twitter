import { sendEmailVerification, updateEmail } from 'firebase/auth';

import { auth } from '@/firebase';

export const updateUserEmail = async (newEmail: string) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    await updateEmail(user, newEmail);
  } catch (error) {
    throw new Error(error as string);
  }
};
