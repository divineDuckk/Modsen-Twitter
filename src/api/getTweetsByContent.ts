import { TweetInfo } from '@/interfaces/tweet';

import { getAllTweets } from './getAllTweets';

export const getTweetsByContent = async (userId: string, content: string) => {
  try {
    const allTweets: TweetInfo[] = await getAllTweets();

    const filteredTweets = allTweets.filter(
      tweet =>
        tweet.text.toLowerCase().includes(content.toLowerCase()) &&
        tweet.userId !== userId,
    );

    return filteredTweets;
  } catch (error) {
    throw new Error(error as string);
  }
};
