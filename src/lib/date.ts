import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export function formatKoreanDateTime(value: string | Date) {
  return dayjs(value).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm')
}
