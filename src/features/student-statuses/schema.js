import { YES_NO_OPTIONS } from '../../constants/choices.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, emptyLearner, LOOKUP_ICONTAINS } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { LABEL_LEARNER } from '../../constants/labels.js'
import { REPORT_COLUMN_LABELS } from '../../constants/reports.js'
import { TEXT_STUDY_YEAR_LABEL, TEXT_STUDY_YEAR_PLACEHOLDER } from '../../constants/texts.js'
import { COL_DATE_W } from '../../constants/ui.js'
import { requiredBlur, TRIGGER_BLUR, ACADEMIC_YEAR_RE, FORMAT_ACADEMIC_YEAR } from '../../constants/validation.js'
export const FIELDS = [
  ...LEARNER_FIELDS,
  { prop: 'academic_year', label: TEXT_STUDY_YEAR_LABEL, type: FIELD_TYPES.TEXT, required: true, placeholder: TEXT_STUDY_YEAR_PLACEHOLDER },
  { prop: 'order_number', label: REPORT_COLUMN_LABELS.order_number, type: FIELD_TYPES.TEXT, required: false },
  { prop: 'gifted_db', label: REPORT_COLUMN_LABELS.gifted_db, type: FIELD_TYPES.BOOL, required: false },
  { prop: 'president_fund', label: REPORT_COLUMN_LABELS.president_fund, type: FIELD_TYPES.BOOL, required: false }
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'student_fio', label: LABEL_LEARNER },
  { prop: 'academic_year', label: TEXT_STUDY_YEAR_LABEL, width: COL_DATE_W },
  { prop: 'order_number', label: REPORT_COLUMN_LABELS.order_number },
  { prop: 'gifted_db', label: REPORT_COLUMN_LABELS.gifted_db, width: COL_DATE_W },
  { prop: 'president_fund', label: REPORT_COLUMN_LABELS.president_fund, width: COL_DATE_W }
]
export const FILTERS = [
  ...LEARNER_FILTERS,
  { prop: 'academic_year', label: TEXT_STUDY_YEAR_LABEL, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'order_number', label: REPORT_COLUMN_LABELS.order_number, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'gifted_db', label: REPORT_COLUMN_LABELS.gifted_db, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { prop: 'president_fund', label: REPORT_COLUMN_LABELS.president_fund, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS }
]
export const RULES = {
  academic_year: [
    requiredBlur('Укажите учебный год'),
    { pattern: ACADEMIC_YEAR_RE, message: FORMAT_ACADEMIC_YEAR, trigger: TRIGGER_BLUR }
  ]
}
export function emptyForm() {
  return { ...emptyLearner(), academic_year: '', order_number: '', gifted_db: false, president_fund: false }
}
