export interface User {
  displayName: string;
  email: string;
  uid: string;
  photoUrl?: string;
  phone?: string;
  birthDate?: string;
  tweetsNumber: number;
  followers: number;
  followings: number;
}

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
}
