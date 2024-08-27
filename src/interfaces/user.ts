import { TweetInfo } from './tweet';

export interface User {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
  phone: string;
  birthDate: string;
  followers: string[];
  followings: string[];
  backgroundUrl: string;
  description: string;
  tweets: TweetInfo[];
  numberOfTweets: number;
  password: string;
  numberOfFollowers: number;
  numberOfFollowings: number;
}

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
}
