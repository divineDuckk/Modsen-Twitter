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
import { MiniUserProfile } from '@/components/MiniUserProfile';

import { DataListProps } from './types';

export const DataList: FC<DataListProps> = ({ query, clearInput }) => {
  const location = useLocation();
  const isProfile = useMemo(
    () => location.pathname.includes(PROFILE),
    [location.pathname],
  );

  const isTweetInfoArray = (
    _data: TweetInfo[] | User[],
  ): _data is TweetInfo[] => {
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
        data.map(({ createdAt, id, text, userId }) => {
          if (!id) return null;
          return (
            <MiniTweet
              createdAt={createdAt}
              text={text}
              userId={userId}
              key={id}
              id={id}
              onMiniTweetClick={clearInput}
            />
          );
        })
      ) : (
        <>
          {data.map(({ displayName, uid, photoURL }) => {
            if (!uid) return null;
            return (
              <MiniUserProfile
                name={displayName}
                uid={uid}
                photo={photoURL}
                key={uid}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
