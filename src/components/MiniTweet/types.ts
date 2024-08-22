import { TweetInfo } from '@/interfaces/tweet';

export type MiniTweetProps = Omit<
  TweetInfo,
  'id' | 'userLikes' | 'likes' | 'imageUrl'
>;
