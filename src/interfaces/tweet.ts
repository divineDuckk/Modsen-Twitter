export interface TweetInfo {
  createdAt: string;
  imageUrl: string;
  likes: number;
  text: string;
  userId: string;
  id: string;
  userLikes: string[];
  authorName: string;
  authorPhoto: string;
}
export interface TweetPageSizeState {
  page: number;
  pageForAllTweets: number;
}
export interface TweetCreationInfo {
  tweetText: string;
  imageUrl: string;
  userId: string;
  photoURL: string;
  userName: string;
}
