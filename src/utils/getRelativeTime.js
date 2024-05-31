import { formatDistanceToNowStrict } from 'date-fns';

const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  return formatDistanceToNowStrict(date, { addSuffix: true });
};

export default getRelativeTime;
