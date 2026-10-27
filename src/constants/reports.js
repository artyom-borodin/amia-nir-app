import {
  LABEL_CIRCLE,
  LABEL_COURSE,
  LABEL_DEPARTMENT,
  LABEL_LEARNER,
  LABEL_ORGANIZATION,
  LABEL_PPS,
  LABEL_SUPERVISOR,
  LABEL_TITLE,
  LABEL_WORK_TITLE,
  LABEL_WORK_TYPE,
  LABEL_CATEGORY,
  LABEL_GROUP,
  LABEL_FACULTY,
  LABEL_MEMBERS,
  LABEL_MEMBERS_FIO,
  LABEL_REPORTS,
  LABEL_PUB_TYPE,
  LABEL_CERTIFICATE,
  LABEL_CADET,
  LABEL_STUDENT,
  LABEL_FPK_STUDENT,
  LABEL_PROBLEM_GROUP,
  LABEL_EVENT_LEVEL,
  LABEL_EVENT_FOUNDER,
  LABEL_DIPLOMA
} from './labels.js'
import {
  TEXT_CITY,
  TEXT_COUNT,
  TEXT_END_DATE,
  TEXT_FOUNDER,
  TEXT_METRIC,
  TEXT_START_DATE,
  TEXT_EXPORT_MODE_NONE,
  TEXT_EXPORT_MODE_NONE_HINT,
  TEXT_EXPORT_MODE_SHEETS,
  TEXT_EXPORT_MODE_SHEETS_HINT,
  TEXT_EXPORT_MODE_INLINE,
  TEXT_EXPORT_MODE_INLINE_HINT,
  TEXT_EXPORT_MODE_BOTH,
  TEXT_EXPORT_MODE_BOTH_HINT,
  TEXT_EXPORT_SCOPE_ALL,
  TEXT_EXPORT_SCOPE_PAGE,
  TEXT_EXPORT_SCOPE_SELECTED
} from './texts.js'
import {
  COURSE,
  CONF_LEVEL,
  CONTEST_LEVEL,
  WORK_KIND,
  PUB_KIND,
  CONTEST_RESULT,
  EXHIBITION_RESULT,
  ACTIVITY_KIND,
  YES_NO_OPTIONS
} from './choices.js'
import { FIELD_TYPES } from './fieldTypes.js'
import { DICT_LABEL_FIELD, DICT_FULL_NAME_FIELD, DICT_SUBDIVISION_FIELD } from './ui.js'
import { DIPLOMA_OPTIONS } from './diploma.js'
import {
  REPORT_KIND_SUMMARY,
  REPORT_KIND_STUDENT,
  REPORT_KIND_PPS,
  REPORT_KIND_DEPARTMENT,
  REPORT_KIND_FACULTY,
  REPORT_KIND_CIRCLES,
  REPORT_KIND_CATEGORY,
  REPORT_KIND_STATUS,
  REPORT_KIND_FOUNDER,
  REPORT_KIND_DYNAMICS
} from './tables.js'

export const SUMMARY_METRIC_LABELS = {
  students: 'Обучающиеся',
  conferences: 'Конференции',
  publications: 'Публикации',
  contests: 'Конкурсы',
  diploma_1: 'Диплом 1 степени',
  diploma_2: 'Диплом 2 степени',
  diploma_3: 'Диплом 3 степени',
  acts: 'Акты о внедрении',
  exhibitions: 'Кафедральные выставки',
  prize_places: 'Призовые места',
  gifted_db: 'Банк данных одарённой молодёжи',
  president_fund: 'Поощрения специального фонда Президента Республики Беларусь',
  circle_reports: 'Доклады научного сообщества (кружка)'
}

export const REPORT_COLUMN_LABELS = {
  metric: TEXT_METRIC,
  count: TEXT_COUNT,
  student: LABEL_LEARNER,
  fio: 'ФИО',
  group: LABEL_GROUP,
  category: LABEL_CATEGORY,
  faculty: LABEL_FACULTY,
  department: LABEL_DEPARTMENT,
  pps: LABEL_PPS,
  supervisor: LABEL_SUPERVISOR,
  circle: LABEL_CIRCLE,
  name: LABEL_TITLE,
  year: 'Год',
  academic_year: 'Учебный год',
  founder: TEXT_FOUNDER,
  conferences: SUMMARY_METRIC_LABELS.conferences,
  publications: SUMMARY_METRIC_LABELS.publications,
  contests: SUMMARY_METRIC_LABELS.contests,
  acts: SUMMARY_METRIC_LABELS.acts,
  exhibitions: SUMMARY_METRIC_LABELS.exhibitions,
  diplomas: 'Дипломы',
  total: 'Всего работ',
  students: SUMMARY_METRIC_LABELS.students,
  supervisors: LABEL_SUPERVISOR,
  problem_groups: 'Проблемные группы (секции)',
  members: LABEL_MEMBERS,
  reports: LABEL_REPORTS,
  circle_reports: SUMMARY_METRIC_LABELS.circle_reports,
  gifted_db: SUMMARY_METRIC_LABELS.gifted_db,
  president_fund: SUMMARY_METRIC_LABELS.president_fund,
  conference_events: 'Конференции всего',
  contest_events: 'Конкурсы всего',
  departments: 'Кафедры',
  faculties: 'Факультеты',
  circles: 'Научные сообщества (кружки)',
  founders: 'Учредители конкурсов и конференций',
  years: 'Годы',
  prize_places: SUMMARY_METRIC_LABELS.prize_places,
  diploma_1: SUMMARY_METRIC_LABELS.diploma_1,
  diploma_2: SUMMARY_METRIC_LABELS.diploma_2,
  diploma_3: SUMMARY_METRIC_LABELS.diploma_3,
  statuses: 'Одарённая молодёжь',
  status_years: 'Годы одарённой молодёжи',
  by_course: LABEL_COURSE,
  student_fio: LABEL_LEARNER,
  learner_category: LABEL_CATEGORY,
  learner_group: LABEL_GROUP,
  learner_subdivision: LABEL_FACULTY,
  subdivision: LABEL_FACULTY,
  supervisor_display: LABEL_SUPERVISOR,
  department_name: LABEL_DEPARTMENT,
  circle_name: 'Научное сообщество (кружок)',
  conference_city: TEXT_CITY,
  conference_level: 'Уровень конференции',
  contest_city: TEXT_CITY,
  contest_level: 'Уровень конкурса',
  exhibition_title: 'Название выставки',
  group_name: 'Название группы/секции',
  founder_name: TEXT_FOUNDER,
  conference_title: 'Название конференции',
  contest_title: 'Название конкурса',
  conference_start_date: TEXT_START_DATE,
  conference_end_date: TEXT_END_DATE,
  contest_start_date: TEXT_START_DATE,
  contest_end_date: TEXT_END_DATE,
  report_title: 'Тема доклада',
  work_title: LABEL_WORK_TITLE,
  title: 'Название статьи',
  course: LABEL_COURSE,
  work_type: LABEL_WORK_TYPE,
  pub_type: LABEL_PUB_TYPE,
  organization: LABEL_ORGANIZATION,
  organization_name: LABEL_ORGANIZATION,
  act_date: 'Дата акта',
  act_number: 'Номер акта',
  result_date: 'Дата получения результата',
  activity_type: 'Вид деятельности',
  result_category: 'Категория (Результат)',
  result: 'Результат',
  order_number: '№ распоряжения',
  date: 'Дата',
  reports_count: LABEL_REPORTS,
  members_fio: LABEL_MEMBERS_FIO,
  members_count: LABEL_MEMBERS,
  output_data: 'Выходные данные',
  has_electronic: 'Электронная версия',
  has_print: 'Печатное издание',
  has_certificate: LABEL_CERTIFICATE
}

export function labelFor(key) {
  return REPORT_COLUMN_LABELS[key] ?? key
}

export function mapReportCols(keys = []) {
  return keys.map((prop) => ({
    prop,
    label: labelFor(prop)
  }))
}

export const CORE_WORK_METRICS = Object.freeze([
  'conferences',
  'publications',
  'contests',
  'acts',
  'exhibitions'
])

export const DYNAMICS_METRIC_KEYS = Object.freeze([...CORE_WORK_METRICS, 'circle_reports'])

export const DYNAMICS_METRICS = Object.freeze(mapReportCols(DYNAMICS_METRIC_KEYS))

export const REPORT_FILTER_ENDPOINTS = {
  cadet: 'cadet',
  student: 'student',
  fpk_student: 'fpk-mag-student',
  pps: 'employee',
  department: 'subdivision',
  subdivision: 'subdivision',
  circle: 'nir-science-circles',
  problem_group: 'nir-problem-groups',
  founder: 'nir-founders',
  organization: 'nir-implementation-organizations'
}

export const REPORT_HIDDEN_COLUMNS = {
  [REPORT_KIND_SUMMARY]: [],
  [REPORT_KIND_STUDENT]: ['student'],
  [REPORT_KIND_PPS]: ['supervisor'],
  [REPORT_KIND_DEPARTMENT]: ['department'],
  [REPORT_KIND_FACULTY]: ['faculty'],
  [REPORT_KIND_CIRCLES]: ['circle'],
  [REPORT_KIND_CATEGORY]: [],
  [REPORT_KIND_STATUS]: [],
  [REPORT_KIND_FOUNDER]: ['founder'],
  [REPORT_KIND_DYNAMICS]: []
}

const BASE_REPORT_FILTERS = [
  'cadet',
  'student',
  'fpk_student',
  'pps',
  'department',
  'subdivision',
  'circle',
  'problem_group',
  'course',
  'level',
  'founder',
  'city',
  'work_type',
  'pub_type',
  'title',
  'has_electronic',
  'has_print',
  'result_category',
  'result',
  'activity_type',
  'organization',
  'diploma',
  'has_certificate',
  'gifted_db',
  'president_fund'
]

function dropReportFilters(drop) {
  return BASE_REPORT_FILTERS.filter((k) => !drop.includes(k))
}

const COMMON_REPORT_DROP = ['activity_type', 'organization', 'result', 'gifted_db', 'president_fund']
const MIN_REPORT_DROP = ['gifted_db', 'president_fund']

export const REPORT_FILTER_FIELDS = {
  [REPORT_KIND_SUMMARY]: BASE_REPORT_FILTERS,
  [REPORT_KIND_STUDENT]: BASE_REPORT_FILTERS,
  [REPORT_KIND_FACULTY]: BASE_REPORT_FILTERS,
  [REPORT_KIND_PPS]: dropReportFilters(COMMON_REPORT_DROP),
  [REPORT_KIND_DEPARTMENT]: dropReportFilters(MIN_REPORT_DROP),
  [REPORT_KIND_CIRCLES]: dropReportFilters(COMMON_REPORT_DROP),
  [REPORT_KIND_CATEGORY]: dropReportFilters(MIN_REPORT_DROP),
  [REPORT_KIND_FOUNDER]: dropReportFilters(COMMON_REPORT_DROP),
  [REPORT_KIND_DYNAMICS]: dropReportFilters(MIN_REPORT_DROP),
  [REPORT_KIND_STATUS]: ['cadet', 'student', 'fpk_student', 'subdivision', 'gifted_db', 'president_fund']
}

export const REPORT_ROW_KEYS = {
  [REPORT_KIND_FACULTY]: { key: ['key', 'id', 'faculty', 'student', 'supervisor', 'department', 'circle', 'founder', 'category', 'academic_year', 'year'], label: ['name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  [REPORT_KIND_DEPARTMENT]: { key: ['key', 'id', 'department', 'student', 'supervisor', 'faculty', 'circle', 'founder', 'category', 'academic_year', 'year'], label: ['name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  [REPORT_KIND_STUDENT]: { key: ['key', 'id', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'category', 'academic_year', 'year'], label: ['fio', 'name', 'category', 'academic_year', 'year', 'key'] },
  [REPORT_KIND_PPS]: { key: ['key', 'id', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'category', 'academic_year', 'year'], label: ['pps', 'name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  [REPORT_KIND_CIRCLES]: { key: ['key', 'id', 'circle', 'student', 'supervisor', 'department', 'faculty', 'founder', 'category', 'academic_year', 'year'], label: ['name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  [REPORT_KIND_CATEGORY]: { key: ['key', 'id', 'category', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'academic_year', 'year'], label: ['category', 'name', 'fio', 'academic_year', 'year', 'key'] },
  [REPORT_KIND_STATUS]: { key: ['key', 'id', 'academic_year', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'category', 'year'], label: ['academic_year', 'name', 'fio', 'category', 'year', 'key'] },
  [REPORT_KIND_FOUNDER]: { key: ['key', 'id', 'founder', 'student', 'supervisor', 'department', 'faculty', 'circle', 'category', 'academic_year', 'year'], label: ['name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  [REPORT_KIND_DYNAMICS]: { key: ['key', 'id', 'year', 'academic_year', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'category'], label: ['year', 'academic_year', 'name', 'fio', 'category', 'key'] }
}

export const REPORT_STRATEGY_SOME_ARRAY = 'some-array'
export const REPORT_STRATEGY_KEYS_LENGTH = 'keys-length'

export const REPORT_BY_COURSE_PROP = 'by_course'
export const TABLE_STUDENT_FIO_PROP = 'student_fio'
export const TABLE_MEMBERS_COUNT_PROP = 'members_count'
export const REPORT_DIPLOMA_KEY = 'diploma'
export const TOTALS_DRILL_KEY = '__totals__'
export const TECHNICAL_ID_SUFFIX = '_id'
export const TECHNICAL_IDS_SUFFIX = '_ids'

export const TECHNICAL_KEYS = Object.freeze([
  'id',
  'key',
  'raw',
  'learner',
  'learner_key',
  'members_fio',
  'cadets_ids',
  'students_ids',
  'fpk_students_ids'
])

export const DRILL_ROW_KIND_RULES = Object.freeze([
  { field: 'report_title', kind: 'conf' },
  { field: 'pub_type', kind: 'pub' },
  { field: 'result_date', kind: 'cont' },
  { field: 'act_date', kind: 'act' },
  { field: 'exhibition_title', kind: 'exhib' },
  { field: 'academic_year', kind: 'stat' },
  { field: 'group_name', kind: 'grp' },
  { field: 'reports_count', kind: 'rep' }
])
export const DRILL_ROW_DEFAULT_KIND = 'item'
export const DEDUP_PREFIX_LEARNER = 'learner:'
export const DEDUP_PREFIX_PPS = 'pps:'
export const DEDUP_PREFIX_ROW = 'row:'

export const REPORT_EVENT_LEVELS = [...CONF_LEVEL, ...CONTEST_LEVEL]

export const REPORT_FILTER_DEFS = [
  { key: 'cadet', label: LABEL_CADET, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.cadet, labelField: DICT_FULL_NAME_FIELD },
  { key: 'student', label: LABEL_STUDENT, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.student, labelField: DICT_FULL_NAME_FIELD },
  { key: 'fpk_student', label: LABEL_FPK_STUDENT, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.fpk_student, labelField: DICT_FULL_NAME_FIELD },
  { key: 'pps', label: LABEL_PPS, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.pps, labelField: DICT_FULL_NAME_FIELD },
  { key: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.department, labelField: DICT_SUBDIVISION_FIELD },
  { key: 'subdivision', label: REPORT_COLUMN_LABELS.faculty, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.subdivision, labelField: DICT_SUBDIVISION_FIELD },
  { key: 'circle', label: LABEL_CIRCLE, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.circle, labelField: DICT_LABEL_FIELD },
  { key: 'problem_group', label: LABEL_PROBLEM_GROUP, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.problem_group, labelField: DICT_LABEL_FIELD },
  { key: 'course', label: LABEL_COURSE, type: FIELD_TYPES.SELECT, options: COURSE },
  { key: 'level', label: LABEL_EVENT_LEVEL, type: FIELD_TYPES.SELECT, options: REPORT_EVENT_LEVELS },
  { key: 'founder', label: LABEL_EVENT_FOUNDER, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.founder, labelField: DICT_LABEL_FIELD },
  { key: 'city', label: TEXT_CITY, type: FIELD_TYPES.TEXT },
  { key: 'work_type', label: LABEL_WORK_TYPE, type: FIELD_TYPES.SELECT, options: WORK_KIND },
  { key: 'pub_type', label: LABEL_PUB_TYPE, type: FIELD_TYPES.SELECT, options: PUB_KIND },
  { key: 'title', label: REPORT_COLUMN_LABELS.title, type: FIELD_TYPES.TEXT },
  { key: 'has_electronic', label: REPORT_COLUMN_LABELS.has_electronic, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { key: 'has_print', label: REPORT_COLUMN_LABELS.has_print, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { key: 'result_category', label: REPORT_COLUMN_LABELS.result_category, type: FIELD_TYPES.SELECT, options: CONTEST_RESULT },
  { key: 'result', label: REPORT_COLUMN_LABELS.result, type: FIELD_TYPES.SELECT, options: EXHIBITION_RESULT },
  { key: 'activity_type', label: REPORT_COLUMN_LABELS.activity_type, type: FIELD_TYPES.SELECT, options: ACTIVITY_KIND },
  { key: 'organization', label: LABEL_ORGANIZATION, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.organization, labelField: DICT_LABEL_FIELD },
  { key: 'has_certificate', label: LABEL_CERTIFICATE, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { key: 'gifted_db', label: REPORT_COLUMN_LABELS.gifted_db, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { key: 'president_fund', label: REPORT_COLUMN_LABELS.president_fund, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS }
]

export const REPORT_DIPLOMA_FILTER_DEF = Object.freeze({
  key: REPORT_DIPLOMA_KEY,
  label: LABEL_DIPLOMA,
  type: FIELD_TYPES.SELECT,
  options: DIPLOMA_OPTIONS
})

export function resolveReportFilterDefs(fields, includeDiploma = false) {
  const base = fields ? REPORT_FILTER_DEFS.filter((f) => fields.includes(f.key)) : REPORT_FILTER_DEFS
  if (!includeDiploma) return base
  const showDiploma = !fields || fields.includes(REPORT_DIPLOMA_KEY)
  return showDiploma ? [...base, REPORT_DIPLOMA_FILTER_DEF] : base
}

export const EXPORT_TARGET_REPORT = 'report'
export const EXPORT_TARGET_CRUD = 'crud'
export const EXPORT_TARGET_DRILL = 'drill'

export const EXPORT_MODE_NONE = 'none'
export const EXPORT_MODE_SHEETS = 'sheets'
export const EXPORT_MODE_INLINE = 'inline'
export const EXPORT_MODE_BOTH = 'both'

export const EXPORT_DETAILS_MODES = Object.freeze([
  { value: EXPORT_MODE_NONE, label: TEXT_EXPORT_MODE_NONE, hint: TEXT_EXPORT_MODE_NONE_HINT },
  { value: EXPORT_MODE_SHEETS, label: TEXT_EXPORT_MODE_SHEETS, hint: TEXT_EXPORT_MODE_SHEETS_HINT },
  { value: EXPORT_MODE_INLINE, label: TEXT_EXPORT_MODE_INLINE, hint: TEXT_EXPORT_MODE_INLINE_HINT },
  { value: EXPORT_MODE_BOTH, label: TEXT_EXPORT_MODE_BOTH, hint: TEXT_EXPORT_MODE_BOTH_HINT }
])

export const EXPORT_SCOPE_ALL = 'all'
export const EXPORT_SCOPE_PAGE = 'page'
export const EXPORT_SCOPE_SELECTED = 'selected'

export const EXPORT_SCOPES = Object.freeze([
  { value: EXPORT_SCOPE_ALL, label: TEXT_EXPORT_SCOPE_ALL },
  { value: EXPORT_SCOPE_PAGE, label: TEXT_EXPORT_SCOPE_PAGE },
  { value: EXPORT_SCOPE_SELECTED, label: TEXT_EXPORT_SCOPE_SELECTED }
])

const SUMMARY_METRIC_KEYS = Object.keys(SUMMARY_METRIC_LABELS)
const LEARNER_ACHIEVEMENT_METRICS = [
  ...CORE_WORK_METRICS,
  'diplomas',
  'statuses',
  'gifted_db',
  'president_fund'
]
const LEARNER_REPORT_METRICS = [...LEARNER_ACHIEVEMENT_METRICS, 'total']

export const REPORT_DETAIL_METRIC_KEYS = Object.freeze({
  [REPORT_KIND_SUMMARY]: SUMMARY_METRIC_KEYS,
  [REPORT_KIND_STUDENT]: LEARNER_REPORT_METRICS,
  [REPORT_KIND_PPS]: ['students', 'conferences', 'publications', 'contests', 'problem_groups', 'members'],
  [REPORT_KIND_DEPARTMENT]: ['supervisors', ...CORE_WORK_METRICS, 'problem_groups', 'members'],
  [REPORT_KIND_FACULTY]: ['students', ...LEARNER_REPORT_METRICS],
  [REPORT_KIND_CIRCLES]: ['problem_groups', 'members', 'conferences', 'publications', 'contests', 'reports'],
  [REPORT_KIND_CATEGORY]: ['students', ...CORE_WORK_METRICS, 'total', REPORT_BY_COURSE_PROP],
  [REPORT_KIND_STATUS]: ['students', 'gifted_db', 'president_fund'],
  [REPORT_KIND_FOUNDER]: ['conferences', 'conference_events', 'publications', 'contests', 'contest_events'],
  [REPORT_KIND_DYNAMICS]: DYNAMICS_METRIC_KEYS
})

export const REPORT_EXPORT_COLUMN_KEYS = Object.freeze({
  [REPORT_KIND_SUMMARY]: SUMMARY_METRIC_KEYS,
  [REPORT_KIND_STUDENT]: [
    'fio',
    'group',
    'category',
    'faculty',
    ...LEARNER_ACHIEVEMENT_METRICS,
    'status_years',
    'total'
  ],
  [REPORT_KIND_PPS]: ['pps', 'department', ...REPORT_DETAIL_METRIC_KEYS[REPORT_KIND_PPS]],
  [REPORT_KIND_DEPARTMENT]: ['name', ...REPORT_DETAIL_METRIC_KEYS[REPORT_KIND_DEPARTMENT]],
  [REPORT_KIND_FACULTY]: ['name', ...REPORT_DETAIL_METRIC_KEYS[REPORT_KIND_FACULTY]],
  [REPORT_KIND_CIRCLES]: ['name', 'year', ...REPORT_DETAIL_METRIC_KEYS[REPORT_KIND_CIRCLES]],
  [REPORT_KIND_CATEGORY]: ['category', ...REPORT_DETAIL_METRIC_KEYS[REPORT_KIND_CATEGORY]],
  [REPORT_KIND_STATUS]: ['academic_year', ...REPORT_DETAIL_METRIC_KEYS[REPORT_KIND_STATUS]],
  [REPORT_KIND_FOUNDER]: ['name', ...REPORT_DETAIL_METRIC_KEYS[REPORT_KIND_FOUNDER]],
  [REPORT_KIND_DYNAMICS]: ['year', ...DYNAMICS_METRIC_KEYS]
})

export function getReportExportColumns(kind) {
  return mapReportCols(REPORT_EXPORT_COLUMN_KEYS[kind])
}

export function getReportDetailMetrics(kind) {
  return mapReportCols(REPORT_DETAIL_METRIC_KEYS[kind])
}

const CRUD_EXTRA_EXPORT_COLUMN_KEYS = Object.freeze({
  [TABLE_STUDENT_FIO_PROP]: ['learner_category', 'learner_group', 'learner_subdivision'],
  [TABLE_MEMBERS_COUNT_PROP]: ['members_fio']
})

export function buildCrudExportColumns(columns = []) {
  const out = []
  for (const col of columns) {
    if (!col?.prop) continue
    out.push({ prop: col.prop, label: col.label || labelFor(col.prop) })
    const extras = CRUD_EXTRA_EXPORT_COLUMN_KEYS[col.prop]
    if (extras) {
      for (const prop of extras) {
        out.push({ prop, label: labelFor(prop), extra: true })
      }
    }
  }
  return out
}

export { DIPLOMA_FILTER_ANY, DIPLOMA_FILTER_NONE, DIPLOMA_FILTER_D1, DIPLOMA_FILTER_D2, DIPLOMA_FILTER_D3, DIPLOMA_TRUE, DIPLOMA_FALSE, DIPLOMA_EMPTY, encodeDiploma, isOn, decodeDiploma, DIPLOMA_OPTIONS } from './diploma.js'
