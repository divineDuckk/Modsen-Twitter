import { useState } from 'react';
import { useSelector } from 'react-redux';

import { getUser } from '@/store/selectors/user';
import { TweetCreationContainer } from '@/components/TweetCreationContainer';
import { Tweet } from '@/components/Tweet';
import { useGetTweets } from '@/hooks/useGetTweets';
import { Loader } from '@/components/Loader';
import { MEDIUM_SIZE } from '@/constants';
import { Portal } from '@/components/Portal';
import { ProfileMenu } from '@/components/ProfileMenu';

import styles from './profile.module.scss';

export const Profile = () => {
  const {
    displayName,
    backgroundUrl,
    photoURL,
    uid,
    description,
    followers,
    followings,
    birthDate,
    phone,
  } = useSelector(getUser);
  const [tweets, isTweetsLoading, setIsTweetsLoading] = useGetTweets(uid);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.header}>
          <h4>{displayName}</h4>
          <span>{tweets.length} Tweets</span>
          <img src={backgroundUrl} alt="background" />
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.imgWithEdits}>
            <img src={photoURL} alt="avatar" referrerPolicy="no-referrer" />
            <button onClick={handlePopupOpen}>Edit profile</button>
          </div>
          <h3>{displayName}</h3>
          <p className={styles.id}>@{displayName + '_' + uid}</p>
          <p className={styles.description}>{description}</p>
          <div className={styles.followsInfo}>
            <p>
              {followings} <span>Following</span>
            </p>
            <p>
              {followers} <span>Followers</span>
            </p>
          </div>
        </div>
        <TweetCreationContainer
          photoURL={photoURL}
          userId={uid}
          type="profile"
          setIsTweetsLoading={setIsTweetsLoading}
        />
        <div className={styles.tweets}>
          <p className={styles.tweetHeader}>Tweets</p>
          {isTweetsLoading ? (
            <Loader size={MEDIUM_SIZE} />
          ) : (
            <>
              {tweets &&
                tweets.map(
                  ({ createdAt, imageUrl, likes, text, id, userLikes }) => (
                    <Tweet
                      content={text}
                      createdAt={createdAt}
                      imageUrl={imageUrl}
                      likes={likes}
                      userName={displayName}
                      userNameId={uid}
                      userPhotoUrl={photoURL}
                      id={id}
                      userLikes={userLikes}
                      key={id}
                    />
                  ),
                )}
            </>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <Portal onClose={handlePopupClose} title="Edit Profile">
          <ProfileMenu
            aboutMe={description}
            backgroundUrl={backgroundUrl}
            name={displayName}
            photoUrl={photoURL}
            birthDate={birthDate!}
            phone={phone!}
            uid={uid}
            handleClose={handlePopupClose}
          />
        </Portal>
      )}
    </>
  );
};
