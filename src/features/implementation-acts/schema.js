import { ACTIVITY_KIND } from '../../constants/choices.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { LABEL_DEPARTMENT, LABEL_LEARNER, LABEL_ORGANIZATION, LABEL_COURSE } from '../../constants/labels.js'
import { requiredBlur, requiredChange } from '../../constants/validation.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, PARTICIPANT_FILTERS, courseField, emptyLearner, LOOKUP_ICONTAINS } from '../_shared.js'
export const FIELDS = [
  ...LEARNER_FIELDS,
  courseField({ required: false }),
  { prop: 'activity_type', label: 'Вид деятельности', type: FIELD_TYPES.SELECT, required: true, options: ACTIVITY_KIND },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, required: false, ref: ENDPOINTS.SUBDIVISION },
  { prop: 'organization', label: LABEL_ORGANIZATION, type: FIELD_TYPES.TEXT, required: true },
  { prop: 'act_date', label: 'Дата акта', type: FIELD_TYPES.DATE, required: true },
  { prop: 'act_number', label: 'Номер акта', type: FIELD_TYPES.TEXT, required: false }
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'student_fio', label: LABEL_LEARNER },
  { prop: 'get_course', label: LABEL_COURSE, width: 80 },
  { prop: 'get_activity_type', label: 'Вид деятельности', width: 200 },
  { prop: 'department_name', label: LABEL_DEPARTMENT },
  { prop: 'organization', label: LABEL_ORGANIZATION },
  { prop: 'act_date', label: 'Дата акта', width: 130 },
  { prop: 'act_number', label: 'Номер акта' }
]
export const FILTERS = [
  ...LEARNER_FILTERS,
  PARTICIPANT_FILTERS.course,
  { prop: 'activity_type', label: 'Вид деятельности', type: FIELD_TYPES.SELECT, options: ACTIVITY_KIND },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, ref: ENDPOINTS.SUBDIVISION },
  { prop: 'organization', label: LABEL_ORGANIZATION, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'act_number', label: 'Номер акта', type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'act_date__gte', label: 'Дата акта с', type: FIELD_TYPES.DATE },
  { prop: 'act_date__lte', label: 'Дата акта по', type: FIELD_TYPES.DATE }
]
export const RULES = {
  activity_type: [requiredChange('Выберите вид деятельности')],
  organization: [requiredBlur('Укажите организацию')],
  act_date: [requiredChange('Укажите дату акта')]
}
export function emptyForm() {
  return { ...emptyLearner(), course: '', activity_type: '', department: null, organization: '', act_date: '', act_number: '' }
}
