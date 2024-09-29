import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export type statusType = 'not loaded' | 'loaded' | 'loading';
export type themeType = 'dark' | 'light';
export type lastVisibleTweetType = QueryDocumentSnapshot<
  DocumentData,
  DocumentData
> | null;
