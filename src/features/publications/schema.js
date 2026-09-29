import { PUB_KIND, YES_NO_OPTIONS } from '../../constants/choices.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { LABEL_LEARNER } from '../../constants/labels.js'
import { TEXT_MSG_COURSE_REQUIRED, TEXT_MSG_SUPERVISOR_REQUIRED, requiredTitleMsg } from '../../constants/texts.js'
import { requiredBlur, requiredChange } from '../../constants/validation.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, PARTICIPANT_FIELDS, PARTICIPANT_FILTERS, emptyLearner, LOOKUP_ICONTAINS } from '../_shared.js'
export const FIELDS = [
  ...LEARNER_FIELDS,
  PARTICIPANT_FIELDS.course,
  PARTICIPANT_FIELDS.supervisor,
  { prop: 'title', label: 'Название статьи', type: FIELD_TYPES.TEXT, required: true },
  { prop: 'pub_type', label: 'Вид публикации', type: FIELD_TYPES.SELECT, required: true, options: PUB_KIND },
  { prop: 'output_data', label: 'Выходные данные', type: FIELD_TYPES.TEXTAREA, required: false },
  { prop: 'has_electronic', label: 'Электронная версия', type: FIELD_TYPES.BOOL, required: false },
  { prop: 'has_print', label: 'Печатное издание', type: FIELD_TYPES.BOOL, required: false },
  { prop: 'conference_link', label: 'Связь с конференцией', type: FIELD_TYPES.REF, required: false, ref: ENDPOINTS.CONFERENCE_PARTS },
  PARTICIPANT_FIELDS.problem_group
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'student_fio', label: LABEL_LEARNER },
  { prop: 'title', label: 'Название статьи' },
  { prop: 'get_pub_type', label: 'Вид публикации', width: 170 }
]
export const FILTERS = [
  ...LEARNER_FILTERS,
  PARTICIPANT_FILTERS.supervisor,
  PARTICIPANT_FILTERS.course,
  { prop: 'pub_type', label: 'Вид публикации', type: FIELD_TYPES.SELECT, options: PUB_KIND },
  { prop: 'title', label: 'Название статьи', type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'conference_link', label: 'Связь с конференцией', type: FIELD_TYPES.REF, ref: ENDPOINTS.CONFERENCE_PARTS },
  PARTICIPANT_FILTERS.problem_group,
  { prop: 'has_electronic', label: 'Электронная версия', type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { prop: 'has_print', label: 'Печатное издание', type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS }
]
export const RULES = {
  course: [requiredChange(TEXT_MSG_COURSE_REQUIRED)],
  supervisor: [requiredChange(TEXT_MSG_SUPERVISOR_REQUIRED)],
  title: [requiredBlur(requiredTitleMsg('статьи'))],
  pub_type: [requiredChange('Выберите вид публикации')]
}
export function emptyForm() {
  return {
    ...emptyLearner(),
    course: '',
    supervisor: null,
    title: '',
    pub_type: '',
    output_data: '',
    has_electronic: false,
    has_print: false,
    conference_link: null,
    problem_group: null
  }
}
