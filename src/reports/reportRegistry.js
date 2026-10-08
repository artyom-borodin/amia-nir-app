import ReportTableView from './ReportTableView.vue'
import DynamicsView from './DynamicsView.vue'
import {
  REPORT_KIND_STUDENT,
  REPORT_KIND_PPS,
  REPORT_KIND_DEPARTMENT,
  REPORT_KIND_FACULTY,
  REPORT_KIND_CIRCLES,
  REPORT_KIND_CATEGORY,
  REPORT_KIND_STATUS,
  REPORT_KIND_FOUNDER,
  REPORT_KIND_DYNAMICS
} from '../constants/tables.js'

export const REPORT_VIEW_MAP = {
  [REPORT_KIND_STUDENT]: { component: ReportTableView, props: { kind: REPORT_KIND_STUDENT } },
  [REPORT_KIND_PPS]: { component: ReportTableView, props: { kind: REPORT_KIND_PPS } },
  [REPORT_KIND_DEPARTMENT]: { component: ReportTableView, props: { kind: REPORT_KIND_DEPARTMENT } },
  [REPORT_KIND_FACULTY]: { component: ReportTableView, props: { kind: REPORT_KIND_FACULTY } },
  [REPORT_KIND_CIRCLES]: { component: ReportTableView, props: { kind: REPORT_KIND_CIRCLES } },
  [REPORT_KIND_CATEGORY]: { component: ReportTableView, props: { kind: REPORT_KIND_CATEGORY, showCourseTags: true } },
  [REPORT_KIND_STATUS]: { component: ReportTableView, props: { kind: REPORT_KIND_STATUS } },
  [REPORT_KIND_FOUNDER]: { component: ReportTableView, props: { kind: REPORT_KIND_FOUNDER } },
  [REPORT_KIND_DYNAMICS]: { component: DynamicsView, props: {} }
}
