import { PUB_KIND, YES_NO_OPTIONS } from '../../constants/choices.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { LABEL_LEARNER, LABEL_PROBLEM_GROUP, LABEL_PUB_TYPE, LABEL_CONFERENCE_LINK, LABEL_CONFERENCE, LABEL_SUPERVISOR, LABEL_COURSE } from '../../constants/labels.js'
import { REPORT_COLUMN_LABELS } from '../../constants/reports.js'
import { TEXT_MSG_COURSE_REQUIRED, TEXT_MSG_SUPERVISOR_REQUIRED, requiredTitleMsg } from '../../constants/texts.js'
import { COL_COURSE_W, COL_DATE_W, COL_SELECT_W } from '../../constants/ui.js'
import { requiredBlur, requiredChange } from '../../constants/validation.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, PARTICIPANT_FIELDS, PARTICIPANT_FILTERS, emptyLearner, LOOKUP_ICONTAINS } from '../_shared.js'
export const FIELDS = [
  ...LEARNER_FIELDS,
  PARTICIPANT_FIELDS.course,
  PARTICIPANT_FIELDS.supervisor,
  { prop: 'title', label: REPORT_COLUMN_LABELS.title, type: FIELD_TYPES.TEXT, required: true },
  { prop: 'pub_type', label: LABEL_PUB_TYPE, type: FIELD_TYPES.SELECT, required: true, options: PUB_KIND },
  { prop: 'output_data', label: REPORT_COLUMN_LABELS.output_data, type: FIELD_TYPES.TEXTAREA, required: false },
  { prop: 'has_electronic', label: REPORT_COLUMN_LABELS.has_electronic, type: FIELD_TYPES.BOOL, required: false },
  { prop: 'has_print', label: REPORT_COLUMN_LABELS.has_print, type: FIELD_TYPES.BOOL, required: false },
  { prop: 'conference_link', label: LABEL_CONFERENCE_LINK, type: FIELD_TYPES.REF, required: false, ref: ENDPOINTS.CONFERENCE_PARTS },
  PARTICIPANT_FIELDS.problem_group
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'student_fio', label: LABEL_LEARNER },
  { prop: 'get_course', label: LABEL_COURSE, width: COL_COURSE_W },
  { prop: 'supervisor_display', label: LABEL_SUPERVISOR },
  { prop: 'title', label: REPORT_COLUMN_LABELS.title },
  { prop: 'get_pub_type', label: LABEL_PUB_TYPE, width: COL_SELECT_W },
  { prop: 'output_data', label: REPORT_COLUMN_LABELS.output_data },
  { prop: 'has_electronic', label: REPORT_COLUMN_LABELS.has_electronic, width: COL_DATE_W },
  { prop: 'has_print', label: REPORT_COLUMN_LABELS.has_print, width: COL_DATE_W },
  { prop: 'conference_title', label: REPORT_COLUMN_LABELS.conference_title },
  { prop: 'report_title', label: REPORT_COLUMN_LABELS.report_title },
  { prop: 'problem_group_name', label: LABEL_PROBLEM_GROUP }
]
export const FILTERS = [
  ...LEARNER_FILTERS,
  PARTICIPANT_FILTERS.category,
  PARTICIPANT_FILTERS.course,
  PARTICIPANT_FILTERS.supervisor,
  { prop: 'title', label: REPORT_COLUMN_LABELS.title, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'pub_type', label: LABEL_PUB_TYPE, type: FIELD_TYPES.SELECT, options: PUB_KIND },
  { prop: 'output_data', label: REPORT_COLUMN_LABELS.output_data, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'has_electronic', label: REPORT_COLUMN_LABELS.has_electronic, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { prop: 'has_print', label: REPORT_COLUMN_LABELS.has_print, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { prop: 'conference_link', label: LABEL_CONFERENCE_LINK, type: FIELD_TYPES.REF, ref: ENDPOINTS.CONFERENCE_PARTS },
  PARTICIPANT_FILTERS.problem_group
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
