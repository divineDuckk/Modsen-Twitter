export interface TweetInfo {
  createdAt: string;
  imageUrl: string;
  likes: number;
  text: string;
  userId: string;
  id: string;
  userLikes: string[];
}
export interface TweetPageSizeState {
  page: number;
}
