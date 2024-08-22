import { User } from '@/interfaces/user';

import { getAllUsers } from './getAllUsers';

export const getUsersByName = async (
  name: string,
  userId: string,
): Promise<User[]> => {
  try {
    const allUsers = await getAllUsers();

    const filteredUsers = allUsers.filter(
      user =>
        user.displayName.toLowerCase().includes(name.toLowerCase()) &&
        user.uid !== userId,
    );

    return filteredUsers;
  } catch (error) {
    throw new Error(error as string);
  }
};
