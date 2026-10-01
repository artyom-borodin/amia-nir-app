import { COURSE, YES_NO_OPTIONS, UNKNOWN_LABEL_PREFIX, LEARNER_CATEGORIES } from '../constants/choices.js'
import { TEXT_LEARNER_REQUIRED, TEXT_TITLE_PLACEHOLDER, TEXT_CITY, TEXT_START_DATE, TEXT_END_DATE, TEXT_MSG_DATE_RANGE, TEXT_FOUNDER, TEXT_ADD_FOUNDER, TEXT_MSG_INTEGER } from '../constants/texts.js'
import { TABLE_ID_WIDTH, TABLE_ID_PROP } from '../constants/ui.js'
import { LOOKUP_SEP, QUERY_SEARCH, PK_FIELD, isEmptyValue } from '../constants/api.js'
import { FIELD_TYPES, FIELD_TYPE_TEXT, FIELD_TYPE_REF, FIELD_TYPE_SELECT, FIELD_TYPE_DATE } from '../constants/fieldTypes.js'
import { LABEL_SEPARATOR } from '../constants/choices.js'
import { crudCreatePath } from '../constants/routes.js'
import { ENDPOINTS } from '../constants/endpoints.js'

export { FIELD_TYPES }
export { YES_NO_OPTIONS }
export const YES_NO = YES_NO_OPTIONS

export const ID_COLUMN = { prop: TABLE_ID_PROP, label: 'Код', width: TABLE_ID_WIDTH }

export const LOOKUP_ICONTAINS = 'icontains'
export const LOOKUP_GTE = 'gte'
export const LOOKUP_LTE = 'lte'

export const YEAR_MIN = 1900
export const YEAR_MAX = 2100
export const NON_NEGATIVE_MIN = 0

export const MONTH_RE = /^\d{4}-\d{2}$/
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
export const MONTH_AS_DATE_RE = /^\d{4}-\d{2}-01$/
export const DAY_SUFFIX = '-01'

export const LEARNER_DEFS = [
  { prop: 'cadet', label: 'Курсант', ref: ENDPOINTS.CADET },
  { prop: 'student', label: 'Студент', ref: ENDPOINTS.STUDENT },
  { prop: 'fpk_student', label: 'Слушатель ФПК / Магистрант', ref: ENDPOINTS.FPK_STUDENT }
]
export const LEARNER_KEYS = LEARNER_DEFS.map((d) => d.prop)
export const LEARNER_FIELDS = LEARNER_DEFS.map((d) => ({ ...d, type: FIELD_TYPE_REF, required: false }))
export const LEARNER_FILTERS = LEARNER_DEFS.map((d) => ({ ...d, type: FIELD_TYPE_REF }))
export function emptyLearner() {
  return { cadet: null, student: null, fpk_student: null }
}
export function validateLearner(form) {
  const picked = LEARNER_KEYS.filter((k) => !isEmptyValue(form?.[k]))
  if (picked.length === 1) return ''
  return TEXT_LEARNER_REQUIRED
}
export function validateEventDates(form) {
  const start = form?.start_date
  const end = form?.end_date
  if (!isEmptyValue(start) && !isEmptyValue(end) && end < start) {
    return TEXT_MSG_DATE_RANGE
  }
  return ''
}
export const PARTICIPANT_FIELDS = {
  supervisor: { prop: 'supervisor', label: 'Научный руководитель (ППС кафедры)', type: FIELD_TYPE_REF, required: true, ref: ENDPOINTS.PPS_DEPTS },
  course: { prop: 'course', label: 'Курс на момент участия', type: FIELD_TYPE_SELECT, required: true, options: COURSE },
  problem_group: { prop: 'problem_group', label: 'Проблемная группа (секция)', type: FIELD_TYPE_REF, required: false, ref: ENDPOINTS.PROBLEM_GROUPS }
}

export const PARTICIPANT_FILTERS = {
  supervisor: { prop: 'supervisor', label: 'Научный руководитель (ППС кафедры)', type: FIELD_TYPE_REF, ref: ENDPOINTS.PPS_DEPTS },
  course: { prop: 'course', label: 'Курс на момент участия', type: FIELD_TYPE_SELECT, options: COURSE },
  category: { prop: 'category', label: 'Категория (Статус)', type: FIELD_TYPE_SELECT, options: LEARNER_CATEGORIES },
  problem_group: { prop: 'problem_group', label: 'Проблемная группа (секция)', type: FIELD_TYPE_REF, ref: ENDPOINTS.PROBLEM_GROUPS }
}

export function courseField({ required = true } = {}) {
  return { ...PARTICIPANT_FIELDS.course, required }
}
export const EVENT_INFO_FIELDS = [
  { prop: 'title', label: 'Название', type: FIELD_TYPE_TEXT, required: true, placeholder: TEXT_TITLE_PLACEHOLDER },
  { prop: 'start_date', label: TEXT_START_DATE, type: FIELD_TYPE_DATE, required: true },
  { prop: 'end_date', label: TEXT_END_DATE, type: FIELD_TYPE_DATE, required: true },
  { prop: 'founder', label: TEXT_FOUNDER, type: FIELD_TYPE_REF, required: true, ref: ENDPOINTS.FOUNDERS, addRoute: crudCreatePath(ENDPOINTS.FOUNDERS), addLabel: TEXT_ADD_FOUNDER },
  { prop: 'city', label: TEXT_CITY, type: FIELD_TYPE_TEXT, required: true, placeholder: TEXT_CITY }
]

export function makeAddRef(endpoint, addLabel) {
  return { ref: endpoint, addRoute: crudCreatePath(endpoint), addLabel }
}

export function withLabels(fields, labels) {
  return fields.map((f) => (labels[f.prop] ? { ...f, label: labels[f.prop] } : f))
}

export function unknownLabel(id) {
  return UNKNOWN_LABEL_PREFIX + id
}
export function getRowLabel(row) {
  return row?.fio || row?.title || row?.name || unknownLabel(row?.id)
}
export function fillForm(empty, row) {
  const next = { ...empty }
  if (!row) {
    return next
  }
  for (const k of Object.keys(next)) {
    if (row[k] !== undefined) {
      next[k] = row[k]
    }
  }
  return next
}
export function integerValidator(rule, value, callback) {
  if (isEmptyValue(value)) {
    callback()
    return
  }
  const n = Number(value)
  const min = rule && rule.min !== undefined && rule.min !== null ? rule.min : NON_NEGATIVE_MIN
  const max = rule && rule.max !== undefined && rule.max !== null ? rule.max : null
  if (!Number.isInteger(n) || n < min || (max !== null && n > max)) {
    callback(new Error(TEXT_MSG_INTEGER + min + (max !== null ? ' до ' + max : '')))
    return
  }
  callback()
}
export function isRequired(f) {
  return Boolean(f && f.required)
}
export function normalizeMonth(value) {
  if (isEmptyValue(value)) {
    return value
  }
  const s = String(value)
  if (MONTH_RE.test(s)) {
    return s + DAY_SUFFIX
  }
  return value
}
export function normalizeMonths(form, fields) {
  const next = { ...(form || {}) }
  for (const f of fields || []) {
    if (f && (f.type === FIELD_TYPES.MONTH || f.type === FIELD_TYPES.DATE_MONTH) && next[f.prop] !== undefined) {
      next[f.prop] = normalizeMonth(next[f.prop])
    }
  }
  return next
}
export function emptyFilters(filterDefs) {
  const next = { [QUERY_SEARCH]: '' }
  for (const f of filterDefs || []) {
    next[f.prop] = ''
  }
  return next
}
export function filterQueryKey(f) {
  return f.type === FIELD_TYPES.TEXT && f.lookup ? f.prop + LOOKUP_SEP + f.lookup : f.prop
}
export function dateRangeFilters(prop, labelBase) {
  return [
    { prop: prop + LOOKUP_SEP + LOOKUP_GTE, label: labelBase + ' с', type: FIELD_TYPE_DATE },
    { prop: prop + LOOKUP_SEP + LOOKUP_LTE, label: labelBase + ' по', type: FIELD_TYPE_DATE }
  ]
}
export function buildFilterQuery(filters, filterDefs) {
  const q = {}
  const src = filters || {}
  if (src[QUERY_SEARCH]) {
    q[QUERY_SEARCH] = src[QUERY_SEARCH]
  }
  for (const f of filterDefs || []) {
    const v = src[f.prop]
    if (!isEmptyValue(v)) {
      q[filterQueryKey(f)] = v
    }
  }
  return q
}

export { PK_FIELD, LABEL_SEPARATOR }
