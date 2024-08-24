import bookmarks from '@/assets/bookmarks.svg';
import bookmarksFill from '@/assets/bookmarks_fill.svg';
import explore from '@/assets/explore.svg';
import exploreFill from '@/assets/explore_fill.svg';
import homeFill from '@/assets/home_fill.svg';
import home from '@/assets/home_outline.svg';
import listFill from '@/assets/list_fill.svg';
import list from '@/assets/lists.svg';
import message from '@/assets/messages.svg';
import messageFill from '@/assets/messages_fill.svg';
import more from '@/assets/more.svg';
import notification from '@/assets/notification.svg';
import notificationFill from '@/assets/notification_fill.svg';
import profileFill from '@/assets/profile_fill.svg';
import profile from '@/assets/profile_outline.svg';

export const LINKS = [
  {
    icon: home,
    activeIcon: homeFill,
    title: 'Home',
  },
  {
    icon: explore,
    activeIcon: exploreFill,
    title: 'Explore',
  },
  {
    icon: bookmarks,
    activeIcon: bookmarksFill,
    title: 'Bookmarks',
  },
  {
    icon: list,
    activeIcon: listFill,
    title: 'Lists',
  },
  {
    icon: message,
    activeIcon: messageFill,
    title: 'Messages',
  },
  {
    icon: notification,
    activeIcon: notificationFill,
    title: 'Notifications',
  },
  {
    icon: profile,
    activeIcon: profileFill,
    title: 'Profile',
  },
  {
    icon: more,
    activeIcon: more,
    title: 'More',
  },
];
