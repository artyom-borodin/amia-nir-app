import { COURSE, YES_NO_OPTIONS, UNKNOWN_LABEL_PREFIX, LEARNER_CATEGORIES } from '../constants/choices.js'
import { TEXT_LEARNER_REQUIRED, TEXT_TITLE_PLACEHOLDER, TEXT_CITY, TEXT_START_DATE, TEXT_END_DATE, TEXT_MSG_DATE_RANGE, TEXT_FOUNDER, TEXT_ADD_FOUNDER, TEXT_MSG_INTEGER, TEXT_ORG_PLACEHOLDER, TEXT_MSG_START_DATE_REQUIRED, TEXT_MSG_END_DATE_REQUIRED, TEXT_MSG_FOUNDER_REQUIRED, TEXT_MSG_CITY_REQUIRED, requiredTitleMsg } from '../constants/texts.js'
import { requiredBlur, requiredChange } from '../constants/validation.js'
import { LABEL_START_DATE_FROM, LABEL_END_DATE_TO, LABEL_CADET, LABEL_STUDENT, LABEL_FPK_STUDENT, LABEL_SUPERVISOR, LABEL_COURSE, LABEL_PROBLEM_GROUP, LABEL_CATEGORY, LABEL_TITLE } from '../constants/labels.js'
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
  { prop: 'cadet', label: LABEL_CADET, ref: ENDPOINTS.CADET },
  { prop: 'student', label: LABEL_STUDENT, ref: ENDPOINTS.STUDENT },
  { prop: 'fpk_student', label: LABEL_FPK_STUDENT, ref: ENDPOINTS.FPK_STUDENT }
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
  supervisor: { prop: 'supervisor', label: LABEL_SUPERVISOR, type: FIELD_TYPE_REF, required: true, ref: ENDPOINTS.PPS_DEPTS },
  course: { prop: 'course', label: LABEL_COURSE, type: FIELD_TYPE_SELECT, required: true, options: COURSE },
  problem_group: { prop: 'problem_group', label: LABEL_PROBLEM_GROUP, type: FIELD_TYPE_REF, required: false, ref: ENDPOINTS.PROBLEM_GROUPS }
}

export const PARTICIPANT_FILTERS = {
  supervisor: { prop: 'supervisor', label: LABEL_SUPERVISOR, type: FIELD_TYPE_REF, ref: ENDPOINTS.PPS_DEPTS },
  course: { prop: 'course', label: LABEL_COURSE, type: FIELD_TYPE_SELECT, options: COURSE },
  category: { prop: 'category', label: LABEL_CATEGORY, type: FIELD_TYPE_SELECT, options: LEARNER_CATEGORIES },
  problem_group: { prop: 'problem_group', label: LABEL_PROBLEM_GROUP, type: FIELD_TYPE_REF, ref: ENDPOINTS.PROBLEM_GROUPS }
}

export function courseField({ required = true } = {}) {
  return { ...PARTICIPANT_FIELDS.course, required }
}
export const EVENT_INFO_FIELDS = [
  { prop: 'title', label: LABEL_TITLE, type: FIELD_TYPE_TEXT, required: true, placeholder: TEXT_TITLE_PLACEHOLDER },
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
export function dateRangeFilters(prop, labelBase, extra = {}) {
  return [
    { prop: prop + LOOKUP_SEP + LOOKUP_GTE, label: labelBase + ' с', type: FIELD_TYPE_DATE, ...extra },
    { prop: prop + LOOKUP_SEP + LOOKUP_LTE, label: labelBase + ' по', type: FIELD_TYPE_DATE, ...extra }
  ]
}
export function eventDateRangeFilters(prefix) {
  return [
    { prop: prefix + LOOKUP_SEP + 'start_date' + LOOKUP_SEP + LOOKUP_GTE, label: LABEL_START_DATE_FROM, type: FIELD_TYPE_DATE },
    { prop: prefix + LOOKUP_SEP + 'end_date' + LOOKUP_SEP + LOOKUP_LTE, label: LABEL_END_DATE_TO, type: FIELD_TYPE_DATE }
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

export function makeNameSchema({ label, entityWord }) {
  const fields = [
    { prop: 'name', label, type: FIELD_TYPES.TEXT, required: true, placeholder: TEXT_ORG_PLACEHOLDER }
  ]
  return {
    fields,
    columns: [ID_COLUMN, { prop: 'name', label }],
    rules: { name: [requiredBlur(requiredTitleMsg(entityWord))] },
    filters: [{ prop: 'name', label, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS }],
    emptyForm: () => ({ name: '' })
  }
}

export function makeEventSchema({ titleLabel, levelLabel, levelOptions, entityWord, levelPrompt }) {
  const fields = [
    ...withLabels(EVENT_INFO_FIELDS, { title: titleLabel }),
    { prop: 'level', label: levelLabel, type: FIELD_TYPES.SELECT, required: true, options: levelOptions }
  ]
  return {
    fields,
    columns: [
      ID_COLUMN,
      { prop: 'title', label: titleLabel },
      { prop: 'start_date', label: TEXT_START_DATE },
      { prop: 'end_date', label: TEXT_END_DATE },
      { prop: 'founder_name', label: TEXT_FOUNDER },
      { prop: 'city', label: TEXT_CITY },
      { prop: 'get_level', label: levelLabel }
    ],
    rules: {
      title: [requiredBlur(requiredTitleMsg(entityWord))],
      start_date: [requiredChange(TEXT_MSG_START_DATE_REQUIRED)],
      end_date: [requiredChange(TEXT_MSG_END_DATE_REQUIRED)],
      founder: [requiredChange(TEXT_MSG_FOUNDER_REQUIRED)],
      city: [requiredBlur(TEXT_MSG_CITY_REQUIRED)],
      level: [requiredChange(levelPrompt)]
    },
    filters: [
      { prop: 'title', label: titleLabel, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
      { prop: 'start_date__gte', label: LABEL_START_DATE_FROM, type: FIELD_TYPES.DATE },
      { prop: 'end_date__lte', label: LABEL_END_DATE_TO, type: FIELD_TYPES.DATE },
      { prop: 'founder', label: TEXT_FOUNDER, type: FIELD_TYPES.REF, ref: ENDPOINTS.FOUNDERS },
      { prop: 'city', label: TEXT_CITY, type: FIELD_TYPES.TEXT, lookup: LOOKUP_ICONTAINS },
      { prop: 'level', label: levelLabel, type: FIELD_TYPES.SELECT, options: levelOptions }
    ],
    emptyForm: () => ({ title: '', start_date: '', end_date: '', founder: null, city: '', level: '' })
  }
}
