import { ID_COLUMN } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { LABEL_DEPARTMENT, LABEL_PPS } from '../../constants/labels.js'
import { TEXT_MSG_DEPARTMENT_REQUIRED } from '../../constants/texts.js'
import { requiredChange } from '../../constants/validation.js'
export const FIELDS = [
  { prop: 'pps', label: LABEL_PPS, type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.EMPLOYEE },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.SUBDIVISION }
]
export const COLUMNS = [ID_COLUMN, { prop: 'pps_fio', label: LABEL_PPS }, { prop: 'department_name', label: LABEL_DEPARTMENT }]
export const RULES = {
  pps: [requiredChange('Выберите ППС')],
  department: [requiredChange(TEXT_MSG_DEPARTMENT_REQUIRED)]
}
export const FILTERS = [
  { prop: 'pps', label: LABEL_PPS, type: FIELD_TYPES.REF, ref: ENDPOINTS.EMPLOYEE },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, ref: ENDPOINTS.SUBDIVISION }
]
export function emptyForm() {
  return { pps: null, department: null }
}
