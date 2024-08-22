import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getTweetsByContent } from '@/api/getTweetsByContent';
import { useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/selectors/user';
import { TweetInfo } from '@/interfaces/tweet';
import { User } from '@/interfaces/user';
import { PROFILE } from '@/constants';
import { MiniTweet } from '@/components/MiniTweet';
import { getUsersByName } from '@/api/getUserByName';

import { DataListProps } from './types';

export const DataList: FC<DataListProps> = ({ query }) => {
  const isProfile = useLocation().pathname.includes(PROFILE);
  const isTweetInfoArray = (
    data: TweetInfo[] | User[],
  ): data is TweetInfo[] => {
    return isProfile;
  };
  const [data, setData] = useState<TweetInfo[] | User[]>([]);
  const { uid } = useAppSelector(getUser);
  useEffect(() => {
    if (query === '') {
      setData([]);
      return;
    }
    const getData = async () => {
      if (isProfile) {
        const tweets = await getTweetsByContent(uid, query);
        setData(tweets);
        return;
      }
      const users = await getUsersByName(query, uid);
      setData(users);
    };
    getData();
  }, [query]);

  return (
    <div>
      {isTweetInfoArray(data) ? (
        data.map(({ createdAt, id, text, userId }) => (
          <MiniTweet
            createdAt={createdAt}
            text={text}
            userId={userId}
            key={id}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
