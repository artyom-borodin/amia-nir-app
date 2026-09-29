import ByStudentView from './ByStudentView.vue'
import ByPpsView from './ByPpsView.vue'
import ByDepartmentView from './ByDepartmentView.vue'
import ByFacultyView from './ByFacultyView.vue'
import ByCirclesView from './ByCirclesView.vue'
import ByCategoryView from './ByCategoryView.vue'
import ByStatusView from './ByStatusView.vue'
import ByFounderView from './ByFounderView.vue'
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
  [REPORT_KIND_STUDENT]: ByStudentView,
  [REPORT_KIND_PPS]: ByPpsView,
  [REPORT_KIND_DEPARTMENT]: ByDepartmentView,
  [REPORT_KIND_FACULTY]: ByFacultyView,
  [REPORT_KIND_CIRCLES]: ByCirclesView,
  [REPORT_KIND_CATEGORY]: ByCategoryView,
  [REPORT_KIND_STATUS]: ByStatusView,
  [REPORT_KIND_FOUNDER]: ByFounderView,
  [REPORT_KIND_DYNAMICS]: DynamicsView
}
