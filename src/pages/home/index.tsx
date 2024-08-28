import { getCurrentTweetsSizeInHome } from '@/store/selectors/page';
import { TweetCreationContainer } from '@/components/TweetCreationContainer';
import { useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/selectors/user';
import { useGetAllTweets } from '@/hooks/useGetAllTweets';
import { useInfiniteScroll } from '@/hooks/useInfiniteSrcoll';
import { Tweet } from '@/components/Tweet';
import { Loader } from '@/components/Loader';
import { MEDIUM_SIZE } from '@/constants';
import { TweetInfo } from '@/interfaces/tweet';

import { Header } from './Header';
import styles from './home.module.scss';

export const Home = () => {
  const { photoURL, uid, displayName } = useAppSelector(getUser);
  const page = useAppSelector(getCurrentTweetsSizeInHome);

  const [tweets, isTweetsLoading, setIsTweetsLoading, fetchTweets, setTweets] =
    useGetAllTweets();
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
        page={page}
        photoURL={photoURL}
        userId={uid}
        type="home"
        setIsTweetsLoading={setIsTweetsLoading}
        userName={displayName}
        setAllTweets={setTweets}
      />
      <div>
        {tweets.map(
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
