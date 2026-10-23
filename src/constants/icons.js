import {
  Reading,
  Microphone,
  Trophy,
  Stamp,
  Picture,
  GoldMedal,
  DocumentChecked,
  Opportunity,
  Connection,
  Calendar,
  Flag,
  OfficeBuilding,
  Suitcase,
  Postcard,
  PieChart,
  TrendCharts,
  User,
  Avatar,
  School,
  Histogram,
  FolderOpened,
  Management,
  Notebook,
  DataLine,
  Grid
} from '@element-plus/icons-vue'
import { TABLE_KEYS } from './endpoints.js'
import {
  REPORT_KIND_SUMMARY,
  REPORT_KIND_DYNAMICS,
  REPORT_KIND_STUDENT,
  REPORT_KIND_PPS,
  REPORT_KIND_DEPARTMENT,
  REPORT_KIND_FACULTY,
  REPORT_KIND_CIRCLES,
  REPORT_KIND_CATEGORY,
  REPORT_KIND_STATUS,
  REPORT_KIND_FOUNDER,
  TABLE_GROUP_RESULTS,
  TABLE_GROUP_DICTS,
  MENU_GROUP_REPORTS
} from './tables.js'

export const NAV_GROUP_ICONS = Object.freeze({
  [TABLE_GROUP_RESULTS]: Management,
  [MENU_GROUP_REPORTS]: DataLine,
  [TABLE_GROUP_DICTS]: Notebook
})

export const TABLE_ICONS = Object.freeze({
  [TABLE_KEYS.PUBLICATIONS]: Reading,
  [TABLE_KEYS.CONFERENCE_PARTS]: Microphone,
  [TABLE_KEYS.CONTEST_PARTS]: Trophy,
  [TABLE_KEYS.IMPL_ACTS]: Stamp,
  [TABLE_KEYS.EXHIBITIONS]: Picture,
  [TABLE_KEYS.STATUSES]: GoldMedal,
  [TABLE_KEYS.CIRCLE_REPORTS]: DocumentChecked,
  [TABLE_KEYS.SCIENCE_CIRCLES]: Opportunity,
  [TABLE_KEYS.PROBLEM_GROUPS]: Connection,
  [TABLE_KEYS.CONFERENCE_INFOS]: Calendar,
  [TABLE_KEYS.CONTEST_INFOS]: Flag,
  [TABLE_KEYS.FOUNDERS]: OfficeBuilding,
  [TABLE_KEYS.IMPLEMENTATION_ORGANIZATIONS]: Suitcase,
  [TABLE_KEYS.PPS_DEPTS]: Postcard
})

export const REPORT_ICONS = Object.freeze({
  [REPORT_KIND_SUMMARY]: Histogram,
  [REPORT_KIND_DYNAMICS]: TrendCharts,
  [REPORT_KIND_STUDENT]: User,
  [REPORT_KIND_PPS]: Avatar,
  [REPORT_KIND_DEPARTMENT]: Grid,
  [REPORT_KIND_FACULTY]: School,
  [REPORT_KIND_CIRCLES]: Opportunity,
  [REPORT_KIND_CATEGORY]: PieChart,
  [REPORT_KIND_STATUS]: GoldMedal,
  [REPORT_KIND_FOUNDER]: OfficeBuilding
})

export function getTableIcon(key) {
  return TABLE_ICONS[key] || FolderOpened
}

export function getReportIcon(kind) {
  return REPORT_ICONS[kind] || Histogram
}
