export const formatDate = (inputDate: Date): string => {
  const currentDate = new Date();
  const date = new Date(inputDate);
  const diffInMilliseconds = currentDate.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  if (days >= 1) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(diffInSeconds / (60 * 60));
  if (hours >= 1) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  if (diffInSeconds > 1) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
  }
  return `Just now`;
};
