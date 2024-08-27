import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/selectors/user';
import { User } from '@/interfaces/user';
import { addFollower } from '@/api/addFollower';
import { setUser } from '@/store/slices/userSlice';
import { deleteFollower } from '@/api/deleteFollower';

export const useFollow = (
  id: string,
  ownerId: string,
  setLocalUser?: (user: User) => void,
) => {
  const { followings } = useAppSelector(getUser);
  const [isFollowed, setIsFollewed] = useState(followings.includes(id));
  const dispatch = useAppDispatch();
  const handleFollow = async () => {
    if (!isFollowed) {
      setIsFollewed((prev) => !prev);
      const { updatedMyData, updatedUser } = await addFollower(id!, ownerId);
      dispatch(setUser(updatedMyData));
      setLocalUser?.(updatedUser as User);
      return;
    }
    setIsFollewed((prev) => !prev);
    const { updatedMyData, updatedUser } = await deleteFollower(id!, ownerId);
    dispatch(setUser(updatedMyData));
    setLocalUser?.(updatedUser as User);
  };
  return { isFollowed, handleFollow };
};
