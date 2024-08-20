import { TweetInfo } from './tweet';

export interface User {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
  phone?: string;
  birthDate?: string;
  followers: number;
  followings: number;
  backgroundUrl: string;
  description?: string;
  tweets: TweetInfo[];
}

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
}
