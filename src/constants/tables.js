import { TABLE_KEYS } from './endpoints.js'
import { TEXT_RESULTS_GROUP, TEXT_DICTS_GROUP, TEXT_TABLE_FALLBACK } from './texts.js'

export const REPORT_KIND_SUMMARY = 'summary'
export const REPORT_KIND_STUDENT = 'by-student'
export const REPORT_KIND_PPS = 'by-pps'
export const REPORT_KIND_DEPARTMENT = 'by-department'
export const REPORT_KIND_FACULTY = 'by-faculty'
export const REPORT_KIND_CIRCLES = 'by-circles'
export const REPORT_KIND_CATEGORY = 'by-category'
export const REPORT_KIND_STATUS = 'by-status'
export const REPORT_KIND_FOUNDER = 'by-founder'
export const REPORT_KIND_DYNAMICS = 'dynamics'

export const TABLE_GROUP_RESULTS = 'results'
export const TABLE_GROUP_DICTS = 'dicts'
export const MENU_GROUP_REPORTS = 'reports'

export const TABLE_GROUP_TITLES = Object.freeze({
  [TABLE_GROUP_RESULTS]: TEXT_RESULTS_GROUP,
  [TABLE_GROUP_DICTS]: TEXT_DICTS_GROUP
})

export const TABLES = [
  { key: TABLE_KEYS.PUBLICATIONS, title: 'Публикации', endpoint: 'nir-publications', group: TABLE_GROUP_RESULTS },
  { key: TABLE_KEYS.CONFERENCE_PARTS, title: 'Конференции', endpoint: 'nir-conference-participations', group: TABLE_GROUP_RESULTS },
  { key: TABLE_KEYS.CONTEST_PARTS, title: 'Конкурсы', endpoint: 'nir-contest-participations', group: TABLE_GROUP_RESULTS },
  { key: TABLE_KEYS.IMPL_ACTS, title: 'Акты о внедрении', endpoint: 'nir-implementation-acts', group: TABLE_GROUP_RESULTS },
  { key: TABLE_KEYS.EXHIBITIONS, title: 'Кафедральные выставки', endpoint: 'nir-department-exhibitions', group: TABLE_GROUP_RESULTS },
  { key: TABLE_KEYS.STATUSES, title: 'Одарённая молодёжь', endpoint: 'nir-student-statuses', group: TABLE_GROUP_RESULTS },
  { key: TABLE_KEYS.CIRCLE_REPORTS, title: 'Доклады научного сообщества (кружка)', endpoint: 'nir-circle-reports', group: TABLE_GROUP_RESULTS },
  { key: TABLE_KEYS.SCIENCE_CIRCLES, title: 'Научные сообщества (кружки)', endpoint: 'nir-science-circles', group: TABLE_GROUP_DICTS },
  { key: TABLE_KEYS.PROBLEM_GROUPS, title: 'Проблемные группы (секции)', endpoint: 'nir-problem-groups', group: TABLE_GROUP_DICTS },
  { key: TABLE_KEYS.CONFERENCE_INFOS, title: 'Конференции (справочник)', endpoint: 'nir-conference-infos', group: TABLE_GROUP_DICTS },
  { key: TABLE_KEYS.CONTEST_INFOS, title: 'Конкурсы (справочник)', endpoint: 'nir-contest-infos', group: TABLE_GROUP_DICTS },
  { key: TABLE_KEYS.FOUNDERS, title: 'Учредители конкурсов и конференций', endpoint: 'nir-founders', group: TABLE_GROUP_DICTS },
  { key: TABLE_KEYS.IMPLEMENTATION_ORGANIZATIONS, title: 'Организации, внедрившие разработку', endpoint: 'nir-implementation-organizations', group: TABLE_GROUP_DICTS }
]

export const RESULT_TABLES = TABLES.filter((t) => t.group === TABLE_GROUP_RESULTS)
export const DICT_TABLES = TABLES.filter((t) => t.group === TABLE_GROUP_DICTS)
export const TABLE_SECTIONS = [
  { key: TABLE_GROUP_RESULTS, title: TEXT_RESULTS_GROUP, tables: RESULT_TABLES },
  { key: TABLE_GROUP_DICTS, title: TEXT_DICTS_GROUP, tables: DICT_TABLES }
]

export const TABLE_MAP = Object.fromEntries(TABLES.map((t) => [t.key, t]))

export const REPORT_KINDS = [
  { value: REPORT_KIND_SUMMARY, label: 'Общий сводный отчёт' },
  { value: REPORT_KIND_DYNAMICS, label: 'Динамика по годам' },
  { value: REPORT_KIND_STUDENT, label: 'По обучающемуся' },
  { value: REPORT_KIND_CATEGORY, label: 'По категориям обучающихся' },
  { value: REPORT_KIND_STATUS, label: 'По одарённой молодёжи' },
  { value: REPORT_KIND_PPS, label: 'По ППС' },
  { value: REPORT_KIND_DEPARTMENT, label: 'По кафедре' },
  { value: REPORT_KIND_FACULTY, label: 'По факультету' },
  { value: REPORT_KIND_CIRCLES, label: 'По научным сообществам (кружкам) и проблемным группам (секциям)' },
  { value: REPORT_KIND_FOUNDER, label: 'По учредителям' }
]

export function getTable(key) {
  return TABLE_MAP[key] || null
}

export function getTableTitle(key) {
  const t = getTable(key)
  return t ? t.title : TEXT_TABLE_FALLBACK
}

export function getTableGroupTitle(key) {
  const t = getTable(key)
  return TABLE_GROUP_TITLES[t?.group] || TEXT_RESULTS_GROUP
}

export function getEndpoint(key) {
  const t = getTable(key)
  return t ? t.endpoint : key
}

export function hasReportKind(kind) {
  return REPORT_KINDS.some((r) => r.value === kind)
}

export function getReportLabel(kind) {
  const found = REPORT_KINDS.find((r) => r.value === kind)
  return found ? found.label : kind
}
