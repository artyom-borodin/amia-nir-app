import { YES_NO_OPTIONS } from '../../constants/choices.js'
import { ID_COLUMN, LEARNER_FIELDS, LEARNER_FILTERS, emptyLearner, LOOKUP_ICONTAINS } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { TEXT_STUDY_YEAR_LABEL, TEXT_STUDY_YEAR_PLACEHOLDER } from '../../constants/texts.js'
import { requiredBlur, TRIGGER_BLUR, ACADEMIC_YEAR_RE, FORMAT_ACADEMIC_YEAR } from '../../constants/validation.js'
export const FIELDS = [
  ...LEARNER_FIELDS,
  { prop: 'academic_year', label: TEXT_STUDY_YEAR_LABEL, type: FIELD_TYPES.TEXT, required: true, placeholder: TEXT_STUDY_YEAR_PLACEHOLDER },
  { prop: 'order_number', label: '№ распоряжения', type: FIELD_TYPES.TEXT, required: false },
  { prop: 'gifted_db', label: 'Банк данных одарённой молодёжи', type: FIELD_TYPES.BOOL, required: false },
  { prop: 'president_fund', label: 'Поощрения специального фонда Президента Республики Беларусь', type: FIELD_TYPES.BOOL, required: false }
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'student_fio', label: 'Обучающийся' },
  { prop: 'academic_year', label: TEXT_STUDY_YEAR_LABEL, width: 130 },
  { prop: 'order_number', label: '№ распоряжения' },
  { prop: 'gifted_db', label: 'Банк данных одарённой молодёжи', width: 130 },
  { prop: 'president_fund', label: 'Поощрения специального фонда Президента Республики Беларусь', width: 130 }
]
export const FILTERS = [
  ...LEARNER_FILTERS,
  { prop: 'academic_year', label: TEXT_STUDY_YEAR_LABEL, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'order_number', label: '№ распоряжения', type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'gifted_db', label: 'Банк данных одарённой молодёжи', type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { prop: 'president_fund', label: 'Поощрения специального фонда Президента Республики Беларусь', type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS }
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
