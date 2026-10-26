import { TITLE_SEPARATOR } from './formats.js'
import { TEXT_YES, TEXT_NO } from './texts.js'

export const RESULT_NO_CATEGORY = 'Без категории'

export const SUCCESS_CHOICE_VALUES = Object.freeze([
  'Диплом 1 степени',
  'Первое место',
  'Статья ВАК',
  'Международная',
  'Международный'
])

export const WARNING_CHOICE_VALUES = Object.freeze([
  'Диплом 2 степени',
  'Диплом 3 степени',
  'Второе место',
  'Третье место',
  'Республиканская',
  'Республиканский'
])

export const COURSE = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: 'Выпускник', label: 'Выпускник' }
]
export const WORK_KIND = [
  { value: 'доклад', label: 'доклад' },
  { value: 'тезисы', label: 'тезисы' },
  { value: 'статья', label: 'статья' }
]
export const CONTEST_WORK_KIND = [
  { value: 'Научная работа', label: 'Научная работа' },
  { value: 'Доклад', label: 'Доклад' },
  { value: 'Эссе', label: 'Эссе' }
]
export const PUB_KIND = [
  { value: 'Научная статья', label: 'Научная статья' },
  { value: 'Статья ВАК', label: 'Статья ВАК' },
  { value: 'Тезисы', label: 'Тезисы' }
]
export const CONF_LEVEL = [
  { value: 'Международная', label: 'Международная' },
  { value: 'Республиканская', label: 'Республиканская' },
  { value: 'Межвузовская', label: 'Межвузовская' },
  { value: 'Внутриакадемическая', label: 'Внутриакадемическая' }
]
export const CONTEST_LEVEL = [
  { value: 'Международный', label: 'Международный' },
  { value: 'Республиканский', label: 'Республиканский' },
  { value: 'Межвузовский', label: 'Межвузовский' },
  { value: 'Внутриакадемический', label: 'Внутриакадемический' },
  { value: 'Кафедральный', label: 'Кафедральный' }
]
export const CONTEST_RESULT = [
  { value: RESULT_NO_CATEGORY, label: RESULT_NO_CATEGORY },
  { value: 'Диплом 1 степени', label: 'Диплом 1 степени' },
  { value: 'Диплом 2 степени', label: 'Диплом 2 степени' },
  { value: 'Диплом 3 степени', label: 'Диплом 3 степени' }
]
export const EXHIBITION_RESULT = [
  { value: 'Первое место', label: 'Первое место' },
  { value: 'Второе место', label: 'Второе место' },
  { value: 'Третье место', label: 'Третье место' },
  { value: RESULT_NO_CATEGORY, label: RESULT_NO_CATEGORY }
]
export const ACTIVITY_KIND = [
  { value: 'Учебный процесс', label: 'Учебный процесс' },
  { value: 'Практическая деятельность', label: 'Практическая деятельность' }
]

export const YES_NO_OPTIONS = [
  { value: 'true', label: TEXT_YES },
  { value: 'false', label: TEXT_NO }
]

export const LABEL_SEPARATOR = TITLE_SEPARATOR
export const FIO_SEPARATOR = ' '
export const UNKNOWN_LABEL_PREFIX = 'ID '

export const LEARNER_KIND_CADET = 'cadet'
export const LEARNER_KIND_STUDENT = 'student'
export const LEARNER_KIND_FPK = 'fpk_student'

export const FPK_MAG_CHOICE_MAGISTRACY = 2
export const TEXT_MAGISTRACY = 'Магистратура'
export const STATUS_GRADUATED_SUFFIX = 'выпустился'

export const LEARNER_STATUS_LABELS = Object.freeze({
  magistrant: 'Магистрант',
  magistrantGraduated: 'Магистрант - выпустился',
  listener: 'Слушатель',
  listenerGraduated: 'Слушатель - выпустился',
  student: 'Студент',
  studentGraduated: 'Студент - выпустился',
  cadet: 'Курсант - обучается',
  cadetGraduated: 'Курсант - выпустился'
})
