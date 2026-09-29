import { ID_COLUMN, LOOKUP_ICONTAINS } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import {
  requiredBlur,
  TRIGGER_BLUR,
  YEAR_OR_ACADEMIC_YEAR_RE,
  FORMAT_YEAR_OR_ACADEMIC_YEAR
} from '../../constants/validation.js'
import { TEXT_CIRCLE_PLACEHOLDER, TEXT_YEAR_OR_STUDY_YEAR_PLACEHOLDER } from '../../constants/texts.js'
import { LABEL_TITLE } from '../../constants/labels.js'
export const FIELDS = [
  { prop: 'name', label: LABEL_TITLE, type: FIELD_TYPES.TEXT, required: true, placeholder: TEXT_CIRCLE_PLACEHOLDER },
  { prop: 'year', label: 'Год', type: FIELD_TYPES.TEXT, required: true, placeholder: TEXT_YEAR_OR_STUDY_YEAR_PLACEHOLDER }
]
export const COLUMNS = [ID_COLUMN, { prop: 'name', label: LABEL_TITLE }, { prop: 'year', label: 'Год' }]
export const RULES = {
  name: [requiredBlur('Укажите название')],
  year: [
    requiredBlur('Укажите год'),
    { pattern: YEAR_OR_ACADEMIC_YEAR_RE, message: FORMAT_YEAR_OR_ACADEMIC_YEAR, trigger: TRIGGER_BLUR }
  ]
}
export const FILTERS = [
  { prop: 'name', label: LABEL_TITLE, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'year', label: 'Год', type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS }
]
export function emptyForm() {
  return { name: '', year: '' }
}
