import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { Portal } from '@/components/Portal';
import { ProfileMenu } from '@/components/ProfileMenu';
import { Tweet } from '@/components/Tweet';
import { TweetCreationContainer } from '@/components/TweetCreationContainer';
import { LARGE_SIZE, MEDIUM_SIZE } from '@/constants';
import { useGetTweets } from '@/hooks/useGetTweets';
import { getUser } from '@/store/selectors/user';
import { useInfiniteScroll } from '@/hooks/useInfiniteSrcoll';
import { useAppSelector } from '@/store/hooks';
import { useLocalUser } from '@/hooks/useLocalUser';
import { useFollow } from '@/hooks/useFollow';
import { sortByCreatedAt } from '@/utils/functions/sortArrayByDate';

import styles from './profile.module.scss';

export const Profile = () => {
  const user = useAppSelector(getUser);
  const {
    backgroundUrl,
    birthDate,
    description,
    displayName,
    numberOfTweets,
    password,
    phone,
    photoURL,
    uid,
    numberOfFollowers,
    numberOfFollowings,
  } = user;
  const { id } = useParams();
  const [tweets, isTweetsLoading, setIsTweetsLoading, fetchTweets] =
    useGetTweets(id!);

  const { localUser, setLocalUser, isUserLoading } = useLocalUser(id!, user);
  useInfiniteScroll(fetchTweets);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {
    backgroundUrl: localBackgroundUrl,
    birthDate: localBirthDate,
    description: localDescription,
    displayName: localDisplayName,
    numberOfTweets: localNumberOfTweets,
    password: localPassword,
    phone: localPhone,
    photoURL: localPhotoURL,
    uid: localUid,
    numberOfFollowers: localNumberOfFollowers,
    numberOfFollowings: localNumberOfFollowings,
  } = localUser;
  const isOwner = uid === id;

  const sortedTweets = sortByCreatedAt(tweets);

  const { isFollowed, handleFollow } = useFollow(id!, uid, setLocalUser);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={styles.profile}>
        {isUserLoading ? (
          <Loader size={LARGE_SIZE} />
        ) : (
          <>
            <div className={styles.header}>
              <h4>{isOwner ? displayName : localDisplayName}</h4>
              <span>
                {isOwner ? numberOfTweets : localNumberOfTweets} Tweets
              </span>
              <img
                src={isOwner ? backgroundUrl : localBackgroundUrl}
                alt="background"
              />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.imgWithEdits}>
                <img
                  src={isOwner ? photoURL : localPhotoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
                {isOwner && (
                  <button onClick={handlePopupOpen}>Edit profile</button>
                )}
                {!isOwner && (
                  <button
                    data-testid="follow"
                    onClick={handleFollow}
                    className={styles.follow}
                  >
                    {isFollowed ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>
              <h3>{isOwner ? displayName : localDisplayName}</h3>
              <p className={styles.id}>
                @
                {isOwner
                  ? displayName + '_' + uid
                  : localDisplayName + '_' + localUid}
              </p>
              <p className={styles.description}>
                {isOwner ? description : localDescription}
              </p>
              <div className={styles.followsInfo}>
                <p>
                  {isOwner ? numberOfFollowings : localNumberOfFollowings}{' '}
                  <span>Followings</span>
                </p>
                <p>
                  {isOwner ? numberOfFollowers : localNumberOfFollowers}{' '}
                  <span>Followers</span>
                </p>
              </div>
            </div>
            {isOwner && (
              <TweetCreationContainer
                photoURL={photoURL}
                userId={uid}
                type="profile"
                setIsTweetsLoading={setIsTweetsLoading}
                userName={displayName}
              />
            )}
            <div className={styles.tweets}>
              <p className={styles.tweetHeader}>Tweets</p>
              {sortedTweets.map(
                ({
                  createdAt,
                  imageUrl,
                  likes,
                  text,
                  id,
                  userLikes,
                  userId,
                }) => (
                  <Tweet
                    content={text}
                    createdAt={createdAt}
                    imageUrl={imageUrl}
                    likes={likes}
                    userName={isOwner ? displayName : localDisplayName}
                    userNameId={userId}
                    userPhotoUrl={isOwner ? photoURL : localPhotoURL}
                    id={id}
                    userLikes={userLikes}
                    key={id}
                  />
                ),
              )}
              {isTweetsLoading && <Loader size={MEDIUM_SIZE} />}
            </div>
          </>
        )}
      </div>
      {isPopupOpen && (
        <Portal onClose={handlePopupClose} title="Edit Profile">
          <ProfileMenu
            aboutMe={isOwner ? description : localDescription}
            backgroundUrl={isOwner ? backgroundUrl : localBackgroundUrl}
            name={isOwner ? displayName : localDisplayName}
            photoUrl={isOwner ? photoURL : localPhotoURL}
            birthDate={isOwner ? birthDate! : localBirthDate!}
            phone={isOwner ? phone! : localPhone!}
            uid={isOwner ? uid : localUid}
            password={isOwner ? password : localPassword}
            handleClose={handlePopupClose}
          />
        </Portal>
      )}
    </>
  );
};
