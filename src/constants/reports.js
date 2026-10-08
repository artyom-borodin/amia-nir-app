import { LABEL_CIRCLE, LABEL_COURSE, LABEL_DEPARTMENT, LABEL_LEARNER, LABEL_ORGANIZATION, LABEL_PPS, LABEL_SUPERVISOR, LABEL_TITLE, LABEL_WORK_TITLE, LABEL_WORK_TYPE, LABEL_CATEGORY, LABEL_GROUP, LABEL_FACULTY, LABEL_MEMBERS, LABEL_REPORTS, LABEL_PUB_TYPE, LABEL_CERTIFICATE } from './labels.js'
import { TEXT_CITY, TEXT_COUNT, TEXT_END_DATE, TEXT_FOUNDER, TEXT_METRIC, TEXT_START_DATE } from './texts.js'

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
  'category',
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
  'by-status': ['cadet', 'student', 'fpk_student', 'subdivision', 'category', 'gifted_db', 'president_fund']
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

export { DIPLOMA_FILTER_ANY, DIPLOMA_FILTER_NONE, DIPLOMA_FILTER_D1, DIPLOMA_FILTER_D2, DIPLOMA_FILTER_D3, DIPLOMA_TRUE, DIPLOMA_FALSE, DIPLOMA_EMPTY, encodeDiploma, isOn, decodeDiploma, DIPLOMA_OPTIONS } from './diploma.js'
