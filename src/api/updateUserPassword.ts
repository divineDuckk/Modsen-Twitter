import { updatePassword } from 'firebase/auth';

import { auth } from '@/firebase';

export const updateUserPassword = async (newPassword: string) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
    }
  } catch (error) {
    throw new Error(error as string);
  }
};
