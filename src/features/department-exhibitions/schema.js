import { EXHIBITION_RESULT } from '../../constants/choices.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, PARTICIPANT_FIELDS, PARTICIPANT_FILTERS, emptyLearner, LOOKUP_ICONTAINS, dateRangeFilters } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { LABEL_DEPARTMENT, LABEL_WORK_TITLE, LABEL_COURSE, LABEL_LEARNER } from '../../constants/labels.js'
import { REPORT_COLUMN_LABELS } from '../../constants/reports.js'
import { TEXT_MSG_COURSE_REQUIRED, TEXT_MSG_DEPARTMENT_REQUIRED, TEXT_MSG_WORK_TITLE_REQUIRED, requiredTitleMsg } from '../../constants/texts.js'
import { COL_COURSE_W, COL_DATE_W } from '../../constants/ui.js'
import { requiredBlur, requiredChange } from '../../constants/validation.js'
export const FIELDS = [
  { prop: 'title', label: REPORT_COLUMN_LABELS.exhibition_title, type: FIELD_TYPES.TEXT, required: true },
  { prop: 'date', label: REPORT_COLUMN_LABELS.date, type: FIELD_TYPES.DATE, required: true },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.SUBDIVISION },
  ...LEARNER_FIELDS,
  PARTICIPANT_FIELDS.course,
  { prop: 'work_title', label: LABEL_WORK_TITLE, type: FIELD_TYPES.TEXT, required: true },
  { prop: 'result', label: REPORT_COLUMN_LABELS.result, type: FIELD_TYPES.SELECT, required: true, options: EXHIBITION_RESULT }
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'title', label: REPORT_COLUMN_LABELS.exhibition_title },
  { prop: 'date', label: REPORT_COLUMN_LABELS.date, width: COL_DATE_W },
  { prop: 'department_name', label: LABEL_DEPARTMENT, width: COL_DATE_W },
  { prop: 'student_fio', label: LABEL_LEARNER },
  { prop: 'get_course', label: LABEL_COURSE, width: COL_COURSE_W },
  { prop: 'work_title', label: LABEL_WORK_TITLE },
  { prop: 'get_result', label: REPORT_COLUMN_LABELS.result, width: COL_DATE_W }
]
export const FILTERS = [
  { prop: 'title', label: REPORT_COLUMN_LABELS.exhibition_title, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  ...dateRangeFilters('date', REPORT_COLUMN_LABELS.date),
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, ref: ENDPOINTS.SUBDIVISION },
  ...LEARNER_FILTERS,
  PARTICIPANT_FILTERS.category,
  PARTICIPANT_FILTERS.course,
  { prop: 'work_title', label: LABEL_WORK_TITLE, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'result', label: REPORT_COLUMN_LABELS.result, type: FIELD_TYPES.SELECT, options: EXHIBITION_RESULT }
]
export const RULES = {
  title: [requiredBlur(requiredTitleMsg('выставки'))],
  date: [requiredChange('Укажите дату')],
  department: [requiredChange(TEXT_MSG_DEPARTMENT_REQUIRED)],
  course: [requiredChange(TEXT_MSG_COURSE_REQUIRED)],
  work_title: [requiredBlur(TEXT_MSG_WORK_TITLE_REQUIRED)],
  result: [requiredChange('Выберите результат')]
}
export function emptyForm() {
  return { title: '', date: '', department: null, ...emptyLearner(), course: '', work_title: '', result: '' }
}
