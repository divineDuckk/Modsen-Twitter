import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { Portal } from '@/components/Portal';
import { ProfileMenu } from '@/components/ProfileMenu';
import { Tweet } from '@/components/Tweet';
import { TweetCreationContainer } from '@/components/TweetCreationContainer';
import { MEDIUM_SIZE } from '@/constants';
import { useGetTweets } from '@/hooks/useGetTweets';
import { getUser } from '@/store/selectors/user';
import { useInfiniteScroll } from '@/hooks/useInfiniteSrcoll';
import { useAppSelector } from '@/store/hooks';
import { getCurrentTweetsSize } from '@/store/selectors/page';
import { getUserByUserId } from '@/api/getUserByUserId';
import { User } from '@/interfaces/user';

import styles from './profile.module.scss';

export const Profile = () => {
  const user = useSelector(getUser);
  const {
    backgroundUrl,
    birthDate,
    description,
    displayName,
    followers,
    followings,
    numberOfTweets,
    password,
    phone,
    photoURL,
    uid,
  } = user;
  const { id } = useParams();

  const [tweets, isTweetsLoading, setIsTweetsLoading, fetchTweets] =
    useGetTweets(id!);
  const [localUser, setLocalUser] = useState<User>(user);
  useInfiniteScroll(fetchTweets);
  const pageSize = useAppSelector(getCurrentTweetsSize);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    backgroundUrl: localBackgroundUrl,
    birthDate: localBirthDate,
    description: localDescription,
    displayName: localDisplayName,
    followers: localFollowers,
    followings: localFollowings,
    numberOfTweets: localNumberOfTweets,
    password: localPassword,
    phone: localPhone,
    photoURL: localPhotoURL,
    uid: localUid,
  } = localUser;
  const isOwner = uid === id;

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserByUserId(id!);
      setLocalUser(user!);
    };
    getUser();
  }, [id]);

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.header}>
          <h4>{isOwner ? displayName : localDisplayName}</h4>
          <span>{isOwner ? numberOfTweets : localNumberOfTweets} Tweets</span>
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
            {isOwner && <button onClick={handlePopupOpen}>Edit profile</button>}
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
              {isOwner ? followings : localFollowings} <span>Following</span>
            </p>
            <p>
              {isOwner ? followers : localFollowers} <span>Followers</span>
            </p>
          </div>
        </div>
        {isOwner && (
          <TweetCreationContainer
            photoURL={photoURL}
            userId={uid}
            type="profile"
            setIsTweetsLoading={setIsTweetsLoading}
            page={pageSize}
            userName={displayName}
          />
        )}
        <div className={styles.tweets}>
          <p className={styles.tweetHeader}>Tweets</p>
          {tweets.map(
            ({ createdAt, imageUrl, likes, text, id, userLikes, userId }) => (
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
