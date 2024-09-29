import { TweetCreationContainer } from '@/components/TweetCreationContainer';
import { useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/selectors/user';
import { useGetAllTweets } from '@/hooks/useGetAllTweets';
import { useInfiniteScroll } from '@/hooks/useInfiniteSrcoll';
import { Tweet } from '@/components/Tweet';
import { Loader } from '@/components/Loader';
import { MEDIUM_SIZE } from '@/constants';
import { TweetInfo } from '@/interfaces/tweet';
import { sortByCreatedAt } from '@/utils/functions/sortArrayByDate';

import { Header } from './Header';
import styles from './home.module.scss';

export const Home = () => {
  const { photoURL, uid, displayName } = useAppSelector(getUser);

  const [tweets, isTweetsLoading, setIsTweetsLoading, fetchTweets, setTweets] =
    useGetAllTweets();

  const sortedTweets = sortByCreatedAt(tweets);
  const updateTweets = (updateTweet: TweetInfo) => {
    setTweets((prev) =>
      prev.map((tweet) => {
        if (tweet.id === updateTweet.id) {
          return updateTweet;
        }
        return tweet;
      }),
    );
  };
  useInfiniteScroll(fetchTweets);
  return (
    <div className={styles.home}>
      <Header />
      <TweetCreationContainer
        photoURL={photoURL}
        userId={uid}
        type="home"
        setIsTweetsLoading={setIsTweetsLoading}
        userName={displayName}
        setAllTweets={setTweets}
      />
      <div>
        {sortedTweets.map(
          ({
            createdAt,
            imageUrl,
            likes,
            text,
            id,
            userLikes,
            authorName,
            authorPhoto,
            userId,
          }) => (
            <Tweet
              content={text}
              createdAt={createdAt}
              imageUrl={imageUrl}
              likes={likes}
              userName={uid === userId ? displayName : authorName}
              userNameId={userId}
              userPhotoUrl={uid === userId ? photoURL : authorPhoto}
              id={id}
              userLikes={userLikes}
              key={id}
              updateTweetInHome={updateTweets}
            />
          ),
        )}
        {isTweetsLoading && <Loader size={MEDIUM_SIZE} />}
      </div>
    </div>
  );
};
