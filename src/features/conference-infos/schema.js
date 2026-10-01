import { CONF_LEVEL } from '../../constants/choices.js'
import { ID_COLUMN, EVENT_INFO_FIELDS, withLabels, LOOKUP_ICONTAINS } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { requiredBlur, requiredChange } from '../../constants/validation.js'
import {
  TEXT_FOUNDER,
  TEXT_CITY,
  TEXT_START_DATE,
  TEXT_END_DATE,
  TEXT_MSG_START_DATE_REQUIRED,
  TEXT_MSG_END_DATE_REQUIRED,
  TEXT_MSG_FOUNDER_REQUIRED,
  TEXT_MSG_CITY_REQUIRED,
  requiredTitleMsg
} from '../../constants/texts.js'
import { LABEL_START_DATE_FROM, LABEL_END_DATE_TO } from '../../constants/labels.js'
export const FIELDS = [
  ...withLabels(EVENT_INFO_FIELDS, { title: 'Название конференции' }),
  { prop: 'level', label: 'Уровень конференции', type: FIELD_TYPES.SELECT, required: true, options: CONF_LEVEL }
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'title', label: 'Название конференции' },
  { prop: 'start_date', label: TEXT_START_DATE },
  { prop: 'end_date', label: TEXT_END_DATE },
  { prop: 'founder_name', label: TEXT_FOUNDER },
  { prop: 'city', label: TEXT_CITY },
  { prop: 'get_level', label: 'Уровень конференции' }
]
export const RULES = {
  title: [requiredBlur(requiredTitleMsg('конференции'))],
  start_date: [requiredChange(TEXT_MSG_START_DATE_REQUIRED)],
  end_date: [requiredChange(TEXT_MSG_END_DATE_REQUIRED)],
  founder: [requiredChange(TEXT_MSG_FOUNDER_REQUIRED)],
  city: [requiredBlur(TEXT_MSG_CITY_REQUIRED)],
  level: [requiredChange('Выберите уровень конференции')]
}
export const FILTERS = [
  { prop: 'title', label: 'Название конференции', type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'start_date__gte', label: LABEL_START_DATE_FROM, type: FIELD_TYPES.DATE },
  { prop: 'end_date__lte', label: LABEL_END_DATE_TO, type: FIELD_TYPES.DATE },
  { prop: 'founder', label: TEXT_FOUNDER, type: FIELD_TYPES.REF, ref: ENDPOINTS.FOUNDERS },
  { prop: 'city', label: TEXT_CITY, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'level', label: 'Уровень конференции', type: FIELD_TYPES.SELECT, options: CONF_LEVEL }
]
export function emptyForm() {
  return { title: '', start_date: '', end_date: '', founder: null, city: '', level: '' }
}
