import { ID_COLUMN, integerValidator, YEAR_MIN, YEAR_MAX, NON_NEGATIVE_MIN } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { LABEL_CIRCLE } from '../../constants/labels.js'
import { TEXT_YEAR_CALENDAR, TEXT_MSG_CIRCLE_REQUIRED, requiredTitleMsg } from '../../constants/texts.js'
import { requiredBlur, requiredChange, TRIGGER_BLUR } from '../../constants/validation.js'

export const FIELDS = [
  { prop: 'year', label: TEXT_YEAR_CALENDAR, type: FIELD_TYPES.NUMBER, required: true, min: YEAR_MIN, max: YEAR_MAX },
  { prop: 'circle', label: LABEL_CIRCLE, type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.SCIENCE_CIRCLES },
  { prop: 'reports_count', label: 'Количество докладов', type: FIELD_TYPES.NUMBER, required: true, min: NON_NEGATIVE_MIN }
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'year', label: TEXT_YEAR_CALENDAR, width: 100 },
  { prop: 'circle_name', label: LABEL_CIRCLE },
  { prop: 'reports_count', label: 'Количество докладов', width: 170 }
]
export const FILTERS = [
  { prop: 'year', label: TEXT_YEAR_CALENDAR, type: FIELD_TYPES.TEXT },
  { prop: 'circle', label: LABEL_CIRCLE, type: FIELD_TYPES.REF, ref: ENDPOINTS.SCIENCE_CIRCLES }
]
export const RULES = {
  year: [
    requiredBlur('Укажите год (календарный)'),
    { validator: integerValidator, min: YEAR_MIN, max: YEAR_MAX, trigger: TRIGGER_BLUR }
  ],
  circle: [requiredChange(TEXT_MSG_CIRCLE_REQUIRED)],
  reports_count: [
    requiredBlur('Укажите количество докладов'),
    { validator: integerValidator, min: NON_NEGATIVE_MIN, trigger: TRIGGER_BLUR }
  ]
}
export function emptyForm() {
  return { year: '', circle: null, reports_count: '' }
}
