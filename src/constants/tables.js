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

export const TABLES = [
  { key: 'science-circles', title: 'Научные сообщества (кружки)', endpoint: 'nir-science-circles' },
  { key: 'problem-groups', title: 'Проблемные группы (секции)', endpoint: 'nir-problem-groups' },
  { key: 'founders', title: 'Учредители конкурсов и конференций', endpoint: 'nir-founders' },
  { key: 'conference-infos', title: 'Конференции (справочник)', endpoint: 'nir-conference-infos' },
  { key: 'contest-infos', title: 'Конкурсы (справочник)', endpoint: 'nir-contest-infos' },
  { key: 'conference-participations', title: 'Конференции', endpoint: 'nir-conference-participations' },
  { key: 'publications', title: 'Публикации', endpoint: 'nir-publications' },
  { key: 'contest-participations', title: 'Конкурсы', endpoint: 'nir-contest-participations' },
  { key: 'implementation-acts', title: 'Акты о внедрении', endpoint: 'nir-implementation-acts' },
  { key: 'department-exhibitions', title: 'Кафедральные выставки', endpoint: 'nir-department-exhibitions' },
  { key: 'student-statuses', title: 'Статусы обучающихся', endpoint: 'nir-student-statuses' },
  { key: 'circle-reports', title: 'Доклады научного сообщества (кружка)', endpoint: 'nir-circle-reports' },
  { key: 'pps-departments', title: 'ППС кафедры', endpoint: 'nir-pps-departments' }
]

export const TABLE_MAP = Object.fromEntries(TABLES.map((t) => [t.key, t]))

export const REPORT_KINDS = [
  { value: REPORT_KIND_SUMMARY, label: 'Общий сводный отчёт' },
  { value: REPORT_KIND_STUDENT, label: 'По обучающемуся' },
  { value: REPORT_KIND_PPS, label: 'По ППС' },
  { value: REPORT_KIND_DEPARTMENT, label: 'По кафедре' },
  { value: REPORT_KIND_FACULTY, label: 'По факультету' },
  { value: REPORT_KIND_CIRCLES, label: 'По научным сообществам (кружкам) и проблемным группам (секциям)' },
  { value: REPORT_KIND_CATEGORY, label: 'По категориям обучающихся' },
  { value: REPORT_KIND_STATUS, label: 'По статусам обучающихся' },
  { value: REPORT_KIND_FOUNDER, label: 'По учредителям' },
  { value: REPORT_KIND_DYNAMICS, label: 'Динамика по годам' }
]

export function getTable(key) {
  return TABLE_MAP[key] || null
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
