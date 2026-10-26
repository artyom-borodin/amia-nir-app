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
import { TEXT_CITY, TEXT_COUNT, TEXT_END_DATE, TEXT_FOUNDER, TEXT_METRIC, TEXT_START_DATE } from './texts.js'
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

export const DYNAMICS_METRICS = [
  { prop: 'conferences', label: SUMMARY_METRIC_LABELS.conferences },
  { prop: 'publications', label: SUMMARY_METRIC_LABELS.publications },
  { prop: 'contests', label: SUMMARY_METRIC_LABELS.contests },
  { prop: 'acts', label: SUMMARY_METRIC_LABELS.acts },
  { prop: 'exhibitions', label: SUMMARY_METRIC_LABELS.exhibitions },
  { prop: 'circle_reports', label: SUMMARY_METRIC_LABELS.circle_reports }
]

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
  summary: [],
  'by-student': ['student'],
  'by-pps': ['supervisor'],
  'by-department': ['department'],
  'by-faculty': ['faculty'],
  'by-circles': ['circle'],
  'by-category': [],
  'by-status': [],
  'by-founder': ['founder'],
  dynamics: []
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
  summary: BASE_REPORT_FILTERS,
  'by-student': BASE_REPORT_FILTERS,
  'by-faculty': BASE_REPORT_FILTERS,
  'by-pps': dropReportFilters(COMMON_REPORT_DROP),
  'by-department': dropReportFilters(MIN_REPORT_DROP),
  'by-circles': dropReportFilters(COMMON_REPORT_DROP),
  'by-category': dropReportFilters(MIN_REPORT_DROP),
  'by-founder': dropReportFilters(COMMON_REPORT_DROP),
  dynamics: dropReportFilters(MIN_REPORT_DROP),
  'by-status': ['cadet', 'student', 'fpk_student', 'subdivision', 'gifted_db', 'president_fund']
}

export const REPORT_ROW_KEYS = {
  'by-faculty': { key: ['key', 'id', 'faculty', 'student', 'supervisor', 'department', 'circle', 'founder', 'category', 'academic_year', 'year'], label: ['name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  'by-department': { key: ['key', 'id', 'department', 'student', 'supervisor', 'faculty', 'circle', 'founder', 'category', 'academic_year', 'year'], label: ['name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  'by-student': { key: ['key', 'id', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'category', 'academic_year', 'year'], label: ['fio', 'name', 'category', 'academic_year', 'year', 'key'] },
  'by-pps': { key: ['key', 'id', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'category', 'academic_year', 'year'], label: ['pps', 'name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  'by-circles': { key: ['key', 'id', 'circle', 'student', 'supervisor', 'department', 'faculty', 'founder', 'category', 'academic_year', 'year'], label: ['name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  'by-category': { key: ['key', 'id', 'category', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'academic_year', 'year'], label: ['category', 'name', 'fio', 'academic_year', 'year', 'key'] },
  'by-status': { key: ['key', 'id', 'academic_year', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'category', 'year'], label: ['academic_year', 'name', 'fio', 'category', 'year', 'key'] },
  'by-founder': { key: ['key', 'id', 'founder', 'student', 'supervisor', 'department', 'faculty', 'circle', 'category', 'academic_year', 'year'], label: ['name', 'fio', 'category', 'academic_year', 'year', 'key'] },
  dynamics: { key: ['key', 'id', 'year', 'academic_year', 'student', 'supervisor', 'department', 'faculty', 'circle', 'founder', 'category'], label: ['year', 'academic_year', 'name', 'fio', 'category', 'key'] }
}

export const REPORT_STRATEGY_SOME_ARRAY = 'some-array'
export const REPORT_STRATEGY_KEYS_LENGTH = 'keys-length'

export const REPORT_BY_COURSE_PROP = 'by_course'
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

export { DIPLOMA_FILTER_ANY, DIPLOMA_FILTER_NONE, DIPLOMA_FILTER_D1, DIPLOMA_FILTER_D2, DIPLOMA_FILTER_D3, DIPLOMA_TRUE, DIPLOMA_FALSE, DIPLOMA_EMPTY, encodeDiploma, isOn, decodeDiploma, DIPLOMA_OPTIONS } from './diploma.js'
