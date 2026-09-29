import { ID_COLUMN, integerValidator, NON_NEGATIVE_MIN, LOOKUP_ICONTAINS } from '../_shared.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { ENDPOINTS } from '../../constants/endpoints.js'
import { LABEL_CIRCLE, LABEL_DEPARTMENT } from '../../constants/labels.js'
import { TEXT_GROUP_PLACEHOLDER, TEXT_MSG_CIRCLE_REQUIRED, TEXT_MSG_DEPARTMENT_REQUIRED, requiredTitleMsg } from '../../constants/texts.js'
import { requiredBlur, requiredChange, TRIGGER_BLUR } from '../../constants/validation.js'
export const FIELDS = [
  { prop: 'circle', label: LABEL_CIRCLE, type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.SCIENCE_CIRCLES },
  { prop: 'name', label: 'Название группы/секции', type: FIELD_TYPES.TEXT, required: true, placeholder: TEXT_GROUP_PLACEHOLDER },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.SUBDIVISION },
  { prop: 'supervisor', label: 'Ответственный (ППС кафедры)', type: FIELD_TYPES.REF, required: true, ref: ENDPOINTS.PPS_DEPTS },
  { prop: 'members_count', label: 'Количество членов', type: FIELD_TYPES.NUMBER, required: false, min: NON_NEGATIVE_MIN }
]
export const COLUMNS = [
  ID_COLUMN,
  { prop: 'name', label: 'Название группы/секции' },
  { prop: 'circle_name', label: LABEL_CIRCLE },
  { prop: 'department_name', label: LABEL_DEPARTMENT },
  { prop: 'supervisor_display', label: 'Ответственный (ППС кафедры)' }
]
export const FILTERS = [
  { prop: 'name', label: 'Название группы/секции', type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
  { prop: 'circle', label: LABEL_CIRCLE, type: FIELD_TYPES.REF, ref: ENDPOINTS.SCIENCE_CIRCLES },
  { prop: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, ref: ENDPOINTS.SUBDIVISION },
  { prop: 'supervisor', label: 'Ответственный (ППС кафедры)', type: FIELD_TYPES.REF, ref: ENDPOINTS.PPS_DEPTS }
]
export const RULES = {
  circle: [requiredChange(TEXT_MSG_CIRCLE_REQUIRED)],
  name: [requiredBlur(requiredTitleMsg('группы/секции'))],
  department: [requiredChange(TEXT_MSG_DEPARTMENT_REQUIRED)],
  supervisor: [requiredChange('Выберите ответственного (ППС кафедры)')],
  members_count: [{ validator: integerValidator, min: NON_NEGATIVE_MIN, trigger: TRIGGER_BLUR }]
}
export function emptyForm() {
  return { circle: null, name: '', department: null, supervisor: null, members_count: null }
}
