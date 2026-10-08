import { ACTIVITY_KIND } from '../../constants/choices.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { LABEL_DEPARTMENT, LABEL_LEARNER, LABEL_ORGANIZATION, LABEL_COURSE } from '../../constants/labels.js'
import { REPORT_COLUMN_LABELS } from '../../constants/reports.js'
import { crudCreatePath } from '../../constants/routes.js'
import { TEXT_ADD_ORGANIZATION, TEXT_MSG_ORGANIZATION_REQUIRED } from '../../constants/texts.js'
import { COL_COURSE_W, COL_DATE_W } from '../../constants/ui.js'
import { requiredChange } from '../../constants/validation.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, PARTICIPANT_FILTERS, courseField, emptyLearner, LOOKUP_ICONTAINS, dateRangeFilters } from '../_shared.js'
export const FIELDS = [
  ...LEARNER_FIELDS,
  courseField({ required: false }),
  { prop: 'activity_type', label: REPORT_COLUMN_LABELS.activity_type, type: FIELD_TYPES.SELECT, required: true, options: ACTIVITY_KIND },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, required: false, ref: ENDPOINTS.SUBDIVISION },
  { prop: 'organization', label: LABEL_ORGANIZATION, type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.IMPLEMENTATION_ORGANIZATIONS, addRoute: crudCreatePath(ENDPOINTS.IMPLEMENTATION_ORGANIZATIONS), addLabel: TEXT_ADD_ORGANIZATION },
  { prop: 'act_date', label: REPORT_COLUMN_LABELS.act_date, type: FIELD_TYPES.DATE, required: true },
  { prop: 'act_number', label: REPORT_COLUMN_LABELS.act_number, type: FIELD_TYPES.TEXT, required: false }
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'student_fio', label: LABEL_LEARNER },
  { prop: 'get_course', label: LABEL_COURSE, width: COL_COURSE_W },
  { prop: 'get_activity_type', label: REPORT_COLUMN_LABELS.activity_type, width: 200 },
  { prop: 'department_name', label: LABEL_DEPARTMENT },
  { prop: 'organization_name', label: LABEL_ORGANIZATION },
  { prop: 'act_date', label: REPORT_COLUMN_LABELS.act_date, width: COL_DATE_W },
  { prop: 'act_number', label: REPORT_COLUMN_LABELS.act_number }
]
export const FILTERS = [
  ...LEARNER_FILTERS,
  PARTICIPANT_FILTERS.course,
  { prop: 'activity_type', label: REPORT_COLUMN_LABELS.activity_type, type: FIELD_TYPES.SELECT, options: ACTIVITY_KIND },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, ref: ENDPOINTS.SUBDIVISION },
  { prop: 'organization', label: LABEL_ORGANIZATION, type: FIELD_TYPES.REF, ref: ENDPOINTS.IMPLEMENTATION_ORGANIZATIONS },
  { prop: 'act_number', label: REPORT_COLUMN_LABELS.act_number, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  ...dateRangeFilters('act_date', REPORT_COLUMN_LABELS.act_date),
]
export const RULES = {
  activity_type: [requiredChange('Выберите вид деятельности')],
  organization: [requiredChange(TEXT_MSG_ORGANIZATION_REQUIRED)],
  act_date: [requiredChange('Укажите дату акта')]
}
export function emptyForm() {
  return { ...emptyLearner(), course: '', activity_type: '', department: null, organization: null, act_date: '', act_number: '' }
}
