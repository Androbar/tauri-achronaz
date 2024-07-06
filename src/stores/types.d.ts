import {clockFormats, dateFormats} from './constants'

export type ClockFormat = typeof clockFormats[number]
export type DateFormat = typeof dateFormats[number];

export type ConfigStore = {
  backgroundColor: string
  backgroundHoverColor: string
  fontColor: string
  fontHoverColor: string
  alarmBgColor: string
  alarmFontColor: string
  clockFormat: ClockFormat
  dateFormat: DateFormat
  showDate: boolean
  alarmTime: string | null,
}
