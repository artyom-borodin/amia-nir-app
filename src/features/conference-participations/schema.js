import { WORK_KIND, YES_NO_OPTIONS } from '../../constants/choices.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { LABEL_COURSE, LABEL_LEARNER, LABEL_SUPERVISOR, LABEL_WORK_TYPE, LABEL_PROBLEM_GROUP, LABEL_START_DATE_FROM, LABEL_END_DATE_TO } from '../../constants/labels.js'
import { crudCreatePath } from '../../constants/routes.js'
import { TEXT_ADD_CONFERENCE, TEXT_START_DATE, TEXT_END_DATE, TEXT_MSG_COURSE_REQUIRED, TEXT_MSG_SUPERVISOR_REQUIRED } from '../../constants/texts.js'
import { requiredBlur, requiredChange } from '../../constants/validation.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, PARTICIPANT_FIELDS, PARTICIPANT_FILTERS, emptyLearner, LOOKUP_ICONTAINS } from '../_shared.js'
export const FIELDS = [
  ...LEARNER_FIELDS,
  PARTICIPANT_FIELDS.course,
  PARTICIPANT_FIELDS.supervisor,
  { prop: 'conference', label: 'Конференция', type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.CONFERENCE_INFOS, addRoute: crudCreatePath(ENDPOINTS.CONFERENCE_INFOS), addLabel: TEXT_ADD_CONFERENCE },
  { prop: 'report_title', label: 'Тема доклада', type: FIELD_TYPES.TEXT, required: true },
  { prop: 'work_type', label: LABEL_WORK_TYPE, type: FIELD_TYPES.SELECT, required: true, options: WORK_KIND },
  { prop: 'diploma_1', label: 'Диплом 1 степени', type: FIELD_TYPES.BOOL, required: false },
  { prop: 'diploma_2', label: 'Диплом 2 степени', type: FIELD_TYPES.BOOL, required: false },
  { prop: 'diploma_3', label: 'Диплом 3 степени', type: FIELD_TYPES.BOOL, required: false },
  { prop: 'has_certificate', label: 'Наличие сертификата', type: FIELD_TYPES.BOOL, required: false },
  PARTICIPANT_FIELDS.problem_group
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'student_fio', label: LABEL_LEARNER },
  { prop: 'get_course', label: LABEL_COURSE, width: 80 },
  { prop: 'supervisor_display', label: LABEL_SUPERVISOR },
  { prop: 'conference_title', label: 'Название конференции' },
  { prop: 'conference_start_date', label: TEXT_START_DATE, width: 130 },
  { prop: 'conference_end_date', label: TEXT_END_DATE, width: 130 },
  { prop: 'report_title', label: 'Тема доклада' },
  { prop: 'get_work_type', label: LABEL_WORK_TYPE, width: 130 },
  { prop: 'diploma_1', label: 'Диплом 1 степени', width: 130 },
  { prop: 'diploma_2', label: 'Диплом 2 степени', width: 130 },
  { prop: 'diploma_3', label: 'Диплом 3 степени', width: 130 },
  { prop: 'has_certificate', label: 'Наличие сертификата', width: 130 },
  { prop: 'problem_group_name', label: LABEL_PROBLEM_GROUP }
]
export const FILTERS = [
  ...LEARNER_FILTERS,
  PARTICIPANT_FILTERS.category,
  PARTICIPANT_FILTERS.course,
  PARTICIPANT_FILTERS.supervisor,
  { prop: 'conference', label: 'Конференция', type: FIELD_TYPES.REF, ref: ENDPOINTS.CONFERENCE_INFOS },
  { prop: 'conference__start_date__gte', label: LABEL_START_DATE_FROM, type: FIELD_TYPES.DATE },
  { prop: 'conference__end_date__lte', label: LABEL_END_DATE_TO, type: FIELD_TYPES.DATE },
  { prop: 'report_title', label: 'Тема доклада', type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'work_type', label: LABEL_WORK_TYPE, type: FIELD_TYPES.SELECT, options: WORK_KIND },
  { prop: 'diploma_1', label: 'Диплом 1 степени', type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { prop: 'diploma_2', label: 'Диплом 2 степени', type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { prop: 'diploma_3', label: 'Диплом 3 степени', type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { prop: 'has_certificate', label: 'Наличие сертификата', type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  PARTICIPANT_FILTERS.problem_group
]
export const RULES = {
  course: [requiredChange(TEXT_MSG_COURSE_REQUIRED)],
  supervisor: [requiredChange(TEXT_MSG_SUPERVISOR_REQUIRED)],
  conference: [requiredChange('Выберите конференцию')],
  report_title: [requiredBlur('Укажите тему доклада')],
  work_type: [requiredChange('Выберите вид работы')]
}
export function emptyForm() {
  return {
    ...emptyLearner(),
    course: '',
    supervisor: null,
    conference: null,
    report_title: '',
    work_type: '',
    diploma_1: false,
    diploma_2: false,
    diploma_3: false,
    has_certificate: false,
    problem_group: null
  }
}
