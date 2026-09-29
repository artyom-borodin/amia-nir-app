import { EXHIBITION_RESULT } from '../../constants/choices.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, PARTICIPANT_FIELDS, emptyLearner, LOOKUP_ICONTAINS } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { LABEL_DEPARTMENT, LABEL_WORK_TITLE } from '../../constants/labels.js'
import { TEXT_MSG_COURSE_REQUIRED, TEXT_MSG_DEPARTMENT_REQUIRED, TEXT_MSG_WORK_TITLE_REQUIRED, requiredTitleMsg } from '../../constants/texts.js'
import { requiredBlur, requiredChange } from '../../constants/validation.js'
export const FIELDS = [
  { prop: 'title', label: 'Название выставки', type: FIELD_TYPES.TEXT, required: true },
  { prop: 'date', label: 'Дата', type: FIELD_TYPES.DATE, required: true },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.SUBDIVISION },
  ...LEARNER_FIELDS,
  PARTICIPANT_FIELDS.course,
  { prop: 'work_title', label: LABEL_WORK_TITLE, type: FIELD_TYPES.TEXT, required: true },
  { prop: 'result', label: 'Результат', type: FIELD_TYPES.SELECT, required: true, options: EXHIBITION_RESULT }
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'title', label: 'Название выставки' },
  { prop: 'department_name', label: LABEL_DEPARTMENT, width: 130 },
  { prop: 'student_fio', label: 'Обучающийся' },
  { prop: 'get_result', label: 'Результат', width: 130 }
]
export const FILTERS = [
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, ref: ENDPOINTS.SUBDIVISION },
  ...LEARNER_FILTERS,
  { prop: 'result', label: 'Результат', type: FIELD_TYPES.SELECT, options: EXHIBITION_RESULT },
  { prop: 'title', label: 'Название выставки', type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'work_title', label: LABEL_WORK_TITLE, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'date__gte', label: 'Дата проведения с', type: FIELD_TYPES.DATE },
  { prop: 'date__lte', label: 'Дата проведения по', type: FIELD_TYPES.DATE }
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
