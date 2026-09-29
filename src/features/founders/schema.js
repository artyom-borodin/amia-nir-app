import { ID_COLUMN, LOOKUP_ICONTAINS } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { requiredBlur } from '../../constants/validation.js'
import { TEXT_ORG_PLACEHOLDER, requiredTitleMsg } from '../../constants/texts.js'
export const FIELDS = [
  { prop: 'name', label: 'Название учредителя', type: FIELD_TYPES.TEXT, required: true, placeholder: TEXT_ORG_PLACEHOLDER }
]
export const COLUMNS = [ID_COLUMN, { prop: 'name', label: 'Название учредителя' }]
export const RULES = {
  name: [requiredBlur(requiredTitleMsg('учредителя'))]
}
export const FILTERS = [
  { prop: 'name', label: 'Название учредителя', type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS }
]
export function emptyForm() {
  return { name: '' }
}
