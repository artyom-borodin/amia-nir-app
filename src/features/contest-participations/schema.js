import { CONTEST_RESULT, CONTEST_WORK_KIND } from '../../constants/choices.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { LABEL_LEARNER, LABEL_WORK_TITLE, LABEL_WORK_TYPE } from '../../constants/labels.js'
import { crudCreatePath } from '../../constants/routes.js'
import { TEXT_ADD_CONTEST, TEXT_START_DATE, TEXT_END_DATE, TEXT_MONTH_DAY_HINT, TEXT_MSG_SUPERVISOR_REQUIRED, TEXT_MSG_WORK_TITLE_REQUIRED } from '../../constants/texts.js'
import { requiredBlur, requiredChange } from '../../constants/validation.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, PARTICIPANT_FIELDS, PARTICIPANT_FILTERS, courseField, emptyLearner, LOOKUP_ICONTAINS } from '../_shared.js'
export const FIELDS = [
  { prop: 'contest', label: 'Конкурс', type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.CONTEST_INFOS, addRoute: crudCreatePath(ENDPOINTS.CONTEST_INFOS), addLabel: TEXT_ADD_CONTEST },
  { prop: 'result_date', label: 'Дата получения результата', type: FIELD_TYPES.DATE_MONTH, required: true, hint: TEXT_MONTH_DAY_HINT },
  ...LEARNER_FIELDS,
  courseField({ required: false }),
  PARTICIPANT_FIELDS.supervisor,
  { prop: 'work_title', label: LABEL_WORK_TITLE, type: FIELD_TYPES.TEXT, required: true },
  { prop: 'work_type', label: LABEL_WORK_TYPE, type: FIELD_TYPES.SELECT, required: false, options: CONTEST_WORK_KIND },
  { prop: 'result_category', label: 'Категория (Результат)', type: FIELD_TYPES.SELECT, required: false, options: CONTEST_RESULT },
  PARTICIPANT_FIELDS.problem_group
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'student_fio', label: LABEL_LEARNER },
  { prop: 'contest_title', label: 'Конкурс' },
  { prop: 'contest_start_date', label: TEXT_START_DATE, width: 130 },
  { prop: 'contest_end_date', label: TEXT_END_DATE, width: 130 },
  { prop: 'work_title', label: LABEL_WORK_TITLE },
  { prop: 'get_result_category', label: 'Категория (Результат)', width: 170 }
]
export const FILTERS = [
  { prop: 'contest', label: 'Конкурс', type: FIELD_TYPES.REF, ref: ENDPOINTS.CONTEST_INFOS },
  ...LEARNER_FILTERS,
  PARTICIPANT_FILTERS.supervisor,
  PARTICIPANT_FILTERS.course,
  { prop: 'work_type', label: LABEL_WORK_TYPE, type: FIELD_TYPES.SELECT, options: CONTEST_WORK_KIND },
  { prop: 'result_category', label: 'Категория (Результат)', type: FIELD_TYPES.SELECT, options: CONTEST_RESULT },
  { prop: 'work_title', label: LABEL_WORK_TITLE, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  PARTICIPANT_FILTERS.problem_group,
  { prop: 'result_date__gte', label: 'Дата результата с', type: FIELD_TYPES.DATE },
  { prop: 'result_date__lte', label: 'Дата результата по', type: FIELD_TYPES.DATE },
  { prop: 'contest__start_date__gte', label: 'Дата конкурса с', type: FIELD_TYPES.DATE },
  { prop: 'contest__end_date__lte', label: 'Дата конкурса по', type: FIELD_TYPES.DATE }
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
