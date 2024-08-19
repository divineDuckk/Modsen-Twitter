export interface User {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
  phone?: string;
  birthDate?: string;
  tweetsNumber: number;
  followers: number;
  followings: number;
  backgroundUrl: string;
  description?: string;
}

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
}
