import { TweetInfo } from '@/interfaces/tweet';

export interface TweetProps {
  userName: string;
  userNameId: string;
  createdAt: string;
  content: string;
  imageUrl: string;
  likes: number;
  userPhotoUrl: string;
  id: string;
  userLikes: string[];
  updateTweetInHome?: (tweet: TweetInfo) => void;
}
