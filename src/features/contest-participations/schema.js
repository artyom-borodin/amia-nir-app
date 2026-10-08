import { CONTEST_RESULT, CONTEST_WORK_KIND } from '../../constants/choices.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { LABEL_LEARNER, LABEL_WORK_TITLE, LABEL_WORK_TYPE, LABEL_COURSE, LABEL_SUPERVISOR, LABEL_PROBLEM_GROUP, LABEL_RESULT_CATEGORY, LABEL_CONTEST } from '../../constants/labels.js'
import { REPORT_COLUMN_LABELS } from '../../constants/reports.js'
import { crudCreatePath } from '../../constants/routes.js'
import { TEXT_ADD_CONTEST, TEXT_START_DATE, TEXT_END_DATE, TEXT_MONTH_DAY_HINT, TEXT_MSG_SUPERVISOR_REQUIRED, TEXT_MSG_WORK_TITLE_REQUIRED } from '../../constants/texts.js'
import { COL_COURSE_W, COL_DATE_W, COL_SELECT_W } from '../../constants/ui.js'
import { requiredBlur, requiredChange } from '../../constants/validation.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, PARTICIPANT_FIELDS, PARTICIPANT_FILTERS, courseField, emptyLearner, LOOKUP_ICONTAINS, dateRangeFilters, eventDateRangeFilters } from '../_shared.js'
export const FIELDS = [
  { prop: 'contest', label: LABEL_CONTEST, type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.CONTEST_INFOS, addRoute: crudCreatePath(ENDPOINTS.CONTEST_INFOS), addLabel: TEXT_ADD_CONTEST },
  { prop: 'result_date', label: REPORT_COLUMN_LABELS.result_date, type: FIELD_TYPES.DATE_MONTH, required: true, hint: TEXT_MONTH_DAY_HINT },
  ...LEARNER_FIELDS,
  courseField({ required: false }),
  PARTICIPANT_FIELDS.supervisor,
  { prop: 'work_title', label: LABEL_WORK_TITLE, type: FIELD_TYPES.TEXT, required: true },
  { prop: 'work_type', label: LABEL_WORK_TYPE, type: FIELD_TYPES.SELECT, required: false, options: CONTEST_WORK_KIND },
  { prop: 'result_category', label: LABEL_RESULT_CATEGORY, type: FIELD_TYPES.SELECT, required: false, options: CONTEST_RESULT },
  PARTICIPANT_FIELDS.problem_group
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'student_fio', label: LABEL_LEARNER },
  { prop: 'contest_title', label: REPORT_COLUMN_LABELS.contest_title },
  { prop: 'contest_start_date', label: TEXT_START_DATE, width: COL_DATE_W },
  { prop: 'contest_end_date', label: TEXT_END_DATE, width: COL_DATE_W },
  { prop: 'result_date', label: REPORT_COLUMN_LABELS.result_date, width: COL_DATE_W },
  { prop: 'get_course', label: LABEL_COURSE, width: COL_COURSE_W },
  { prop: 'supervisor_display', label: LABEL_SUPERVISOR },
  { prop: 'work_title', label: LABEL_WORK_TITLE },
  { prop: 'get_work_type', label: LABEL_WORK_TYPE, width: COL_DATE_W },
  { prop: 'get_result_category', label: LABEL_RESULT_CATEGORY, width: COL_SELECT_W },
  { prop: 'problem_group_name', label: LABEL_PROBLEM_GROUP }
]
export const FILTERS = [
  { prop: 'contest', label: LABEL_CONTEST, type: FIELD_TYPES.REF, ref: ENDPOINTS.CONTEST_INFOS },
  ...eventDateRangeFilters('contest'),
  ...dateRangeFilters('result_date', REPORT_COLUMN_LABELS.result_date),
  ...LEARNER_FILTERS,
  PARTICIPANT_FILTERS.course,
  PARTICIPANT_FILTERS.supervisor,
  { prop: 'work_title', label: LABEL_WORK_TITLE, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'work_type', label: LABEL_WORK_TYPE, type: FIELD_TYPES.SELECT, options: CONTEST_WORK_KIND },
  { prop: 'result_category', label: LABEL_RESULT_CATEGORY, type: FIELD_TYPES.SELECT, options: CONTEST_RESULT },
  PARTICIPANT_FILTERS.problem_group
]
export const RULES = {
  contest: [requiredChange('Выберите конкурс')],
  result_date: [requiredChange('Укажите дату получения результата')],
  supervisor: [requiredChange(TEXT_MSG_SUPERVISOR_REQUIRED)],
  work_title: [requiredBlur(TEXT_MSG_WORK_TITLE_REQUIRED)]
}
export function emptyForm() {
  return {
    contest: null,
    result_date: '',
    ...emptyLearner(),
    course: '',
    supervisor: null,
    work_title: '',
    work_type: '',
    result_category: '',
    problem_group: null
  }
}
