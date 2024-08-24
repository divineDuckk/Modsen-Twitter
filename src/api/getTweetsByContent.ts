import { getAllTweets } from './getAllTweets';

import { TweetInfo } from '@/interfaces/tweet';


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
