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
  metric: 'Показатель',
  count: 'Количество',
  student: 'Обучающийся',
  fio: 'ФИО',
  group: 'Группа',
  category: 'Категория (Статус)',
  faculty: 'Факультет',
  department: 'Кафедра',
  pps: 'ППС',
  supervisor: 'Научный руководитель (ППС кафедры)',
  circle: 'Научное сообщество (кружок)',
  name: 'Название',
  year: 'Год',
  academic_year: 'Учебный год',
  founder: 'Учредитель',
  conferences: 'Конференции',
  publications: 'Публикации',
  contests: 'Конкурсы',
  acts: 'Акты о внедрении',
  exhibitions: 'Кафедральные выставки',
  diplomas: 'Дипломы',
  total: 'Всего работ',
  students: 'Обучающиеся',
  supervisors: 'Научный руководитель (ППС кафедры)',
  problem_groups: 'Проблемные группы (секции)',
  members: 'Количество членов',
  reports: 'Количество докладов',
  circle_reports: 'Доклады научного сообщества (кружка)',
  gifted_db: 'Банк данных одарённой молодёжи',
  president_fund: 'Поощрения специального фонда Президента Республики Беларусь',
  conference_events: 'Конференции всего',
  contest_events: 'Конкурсы всего',
  departments: 'Кафедры',
  faculties: 'Факультеты',
  circles: 'Научные сообщества (кружки)',
  founders: 'Учредители конкурсов и конференций',
  years: 'Годы',
  prize_places: 'Призовые места',
  diploma_1: 'Диплом 1 степени',
  diploma_2: 'Диплом 2 степени',
  diploma_3: 'Диплом 3 степени',
  statuses: 'Одарённая молодёжь',
  status_years: 'Годы одарённой молодёжи',
  by_course: 'Курс на момент участия',
  student_fio: 'Обучающийся',
  learner_category: 'Категория (Статус)',
  learner_group: 'Группа',
  learner_subdivision: 'Факультет',
  subdivision: 'Факультет',
  supervisor_display: 'Научный руководитель (ППС кафедры)',
  department_name: 'Кафедра',
  circle_name: 'Научное сообщество (кружок)',
  conference_city: 'Город проведения',
  conference_level: 'Уровень конференции',
  contest_city: 'Город проведения',
  contest_level: 'Уровень конкурса',
  exhibition_title: 'Название выставки',
  group_name: 'Название группы/секции',
  founder_name: 'Учредитель',
  conference_title: 'Название конференции',
  contest_title: 'Название конкурса',
  conference_start_date: 'Дата начала',
  conference_end_date: 'Дата окончания',
  contest_start_date: 'Дата начала',
  contest_end_date: 'Дата окончания',
  report_title: 'Тема доклада',
  work_title: 'Название работы',
  title: 'Название статьи',
  course: 'Курс на момент участия',
  work_type: 'Вид работы',
  pub_type: 'Вид публикации',
  organization: 'Организация, внедрившая разработку',
  act_date: 'Дата акта',
  act_number: 'Номер акта',
  result_date: 'Дата получения результата',
  activity_type: 'Вид деятельности',
  result_category: 'Категория (Результат)',
  result: 'Результат',
  order_number: '№ распоряжения',
  date: 'Дата',
  reports_count: 'Количество докладов',
  members_count: 'Количество членов',
  output_data: 'Выходные данные',
  has_electronic: 'Электронная версия',
  has_print: 'Печатное издание',
  has_certificate: 'Наличие сертификата'
}

export const DYNAMICS_METRICS = [
  { prop: 'conferences', label: 'Конференции' },
  { prop: 'publications', label: 'Публикации' },
  { prop: 'contests', label: 'Конкурсы' },
  { prop: 'acts', label: 'Акты о внедрении' },
  { prop: 'exhibitions', label: 'Кафедральные выставки' },
  { prop: 'circle_reports', label: 'Доклады научного сообщества (кружка)' }
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
  founder: 'nir-founders'
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

export const REPORT_FILTER_FIELDS = {
  summary: BASE_REPORT_FILTERS,
  'by-student': BASE_REPORT_FILTERS,
  'by-faculty': BASE_REPORT_FILTERS,
  'by-pps': dropReportFilters(['activity_type', 'organization', 'result', 'gifted_db', 'president_fund']),
  'by-department': dropReportFilters(['gifted_db', 'president_fund']),
  'by-circles': dropReportFilters(['activity_type', 'organization', 'result', 'gifted_db', 'president_fund']),
  'by-category': dropReportFilters(['gifted_db', 'president_fund']),
  'by-founder': dropReportFilters(['activity_type', 'organization', 'result', 'gifted_db', 'president_fund']),
  dynamics: dropReportFilters(['gifted_db', 'president_fund']),
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
