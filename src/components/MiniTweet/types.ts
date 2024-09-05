import { TweetInfo } from '@/interfaces/tweet';

export type MiniTweetProps = Omit<
  TweetInfo,
  'userLikes' | 'likes' | 'imageUrl' | 'authorName' | 'authorPhoto'
> & {
  onMiniTweetClick: () => void;
};
