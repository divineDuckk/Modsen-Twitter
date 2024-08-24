import { TweetInfo } from '@/interfaces/tweet';

export const sortByCreatedAt = (array: TweetInfo[]) => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
};
