import { FC, useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { getTweetsByContent } from '@/api/getTweetsByContent';
import { getUsersByName } from '@/api/getUserByName';
import { MiniTweet } from '@/components/MiniTweet';
import { PROFILE } from '@/constants';
import { TweetInfo } from '@/interfaces/tweet';
import { User } from '@/interfaces/user';
import { useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/selectors/user';

import { DataListProps } from './types';

export const DataList: FC<DataListProps> = ({ query }) => {
  const location = useLocation();
  const isProfile = useMemo(
    () => location.pathname.includes(PROFILE),
    [location.pathname],
  );

  const isTweetInfoArray = (
    whichData: TweetInfo[] | User[],
  ): whichData is TweetInfo[] => {
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
      } else {
        const users = await getUsersByName(query, uid);
        setData(users);
      }
    };

    getData();
  }, [query, uid, isProfile]);

  return (
    <div>
      {isTweetInfoArray(data) ? (
        data.map(({ createdAt, id, text, userId }) => (
          <MiniTweet
            createdAt={createdAt}
            text={text}
            userId={userId}
            key={id}
            id={id}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
