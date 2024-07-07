import { ru } from 'date-fns/locale';
import { format as formatFns, utcToZonedTime } from 'date-fns-tz';

import { dateTemplate } from '@/constants';

const mskTZ = 'Europe/Moscow' as const;

export const format = (
  date: number | Date,
  formatString = dateTemplate,
  timezone = mskTZ,
) => {
  let formatter = `${formatString}`;

  if (timezone !== mskTZ) {
    formatter = `${formatter} (zzz)`;
  }

  return formatFns(utcToZonedTime(date, 'Europe/Moscow'), formatter, {
    timeZone: 'Europe/Moscow',
    locale: ru,
  });
};
