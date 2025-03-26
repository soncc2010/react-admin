import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'constants/app';

export const formatDate = (date: string) =>
  dayjs(date).format(DATE_TIME_FORMAT);
