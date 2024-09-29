import { TweetInfo } from '@/interfaces/tweet';

function parseTimeAgo(timeAgoStr: string): number {
  const [value, unit] = timeAgoStr.split(' ');
  const amount = parseInt(value, 10);

  if (unit.startsWith('day')) {
    return amount * 60 * 60 * 24;
  } else if (unit.startsWith('hour')) {
    return amount * 60 * 60;
  } else if (unit.startsWith('minute')) {
    return amount * 60;
  } else if (unit === 'now') {
    return 0;
  }
  return amount;
}
export const sortByCreatedAt = (array: TweetInfo[]): TweetInfo[] => {
  return [...array].sort(
    (a, b) => parseTimeAgo(a.createdAt) - parseTimeAgo(b.createdAt),
  );
};
