import dayjs from 'dayjs'
import { DATE_VALUE_FORMAT } from './formats.js'
export const PERIOD_TYPES = [
  { value: 'year', label: 'Календарный год' },
  { value: 'quarter', label: 'Квартал' },
  { value: 'month', label: 'Месяц' },
  { value: 'five_year', label: 'Пятилетка' },
  { value: 'range', label: 'Произвольный диапазон дат' },
  { value: 'study_year', label: 'Учебный год' }
]

export const PERIOD_KIND_YEAR = 'year'
export const PERIOD_KIND_QUARTER = 'quarter'
export const PERIOD_KIND_MONTH = 'month'
export const PERIOD_KIND_FIVE_YEAR = 'five_year'
export const PERIOD_KIND_RANGE = 'range'
export const PERIOD_KIND_STUDY_YEAR = 'study_year'

export const FIVE_YEAR_SPAN = 4
export const STUDY_YEAR_START_MONTH = 8
export const STUDY_YEAR_END_MONTH = 7
export const MONTHS_PER_QUARTER = 3
export const QUARTER_MIN = 1
export const QUARTER_MAX = 4
export const MONTH_MIN = 1
export const MONTH_MAX = 12
export const QUARTERS = [QUARTER_MIN, 2, 3, QUARTER_MAX]
const DEFAULT_QUARTER = '1'
const DEFAULT_MONTH = '1'

export function formatFiveYearRange(startYear) {
  const s = parseInt(startYear, 10)
  if (!s) return ''
  return s + '-' + (s + FIVE_YEAR_SPAN)
}

export function defaultPeriod() {
  const nowYear = String(new Date().getFullYear())
  return {
    kind: PERIOD_KIND_YEAR,
    year: nowYear,
    quarter: DEFAULT_QUARTER,
    month: DEFAULT_MONTH,
    startYear: String(new Date().getFullYear() - FIVE_YEAR_SPAN),
    dateFrom: '',
    dateTo: '',
    studyYear: ''
  }
}

export function studyYearToRange(studyYear) {
  if (!studyYear || typeof studyYear !== 'string') return {}
  const parts = studyYear.split('/')
  if (parts.length !== 2) return {}
  const first = parseInt(parts[0], 10)
  const second = parseInt(parts[1], 10)
  if (!first || !second) return {}
  return {
    date_from: dayjs().year(first).month(STUDY_YEAR_START_MONTH).startOf('month').format(DATE_VALUE_FORMAT),
    date_to: dayjs().year(second).month(STUDY_YEAR_END_MONTH).endOf('month').format(DATE_VALUE_FORMAT)
  }
}

export function fiveYearToRange(startYear) {
  const year = parseInt(startYear, 10)
  if (!year) return {}
  return {
    date_from: dayjs().year(year).startOf('year').format(DATE_VALUE_FORMAT),
    date_to: dayjs().year(year + FIVE_YEAR_SPAN).endOf('year').format(DATE_VALUE_FORMAT)
  }
}

export function quarterToRange(year, quarter) {
  const val_year = parseInt(year, 10)
  const val_quarter = parseInt(quarter, 10)
  if (!val_year || val_quarter < QUARTER_MIN || val_quarter > QUARTER_MAX) return {}
  const firstMonth = (val_quarter - 1) * MONTHS_PER_QUARTER + 1
  const lastMonth = firstMonth + 2
  return {
    date_from: dayjs().year(val_year).month(firstMonth - 1).startOf('month').format(DATE_VALUE_FORMAT),
    date_to: dayjs().year(val_year).month(lastMonth - 1).endOf('month').format(DATE_VALUE_FORMAT)
  }
}

export function monthToRange(year, month) {
  const val_year = parseInt(year, 10)
  const val_month = parseInt(month, 10)
  if (!val_year || val_month < MONTH_MIN || val_month > MONTH_MAX) return {}
  return {
    date_from: dayjs().year(val_year).month(val_month - 1).startOf('month').format(DATE_VALUE_FORMAT),
    date_to: dayjs().year(val_year).month(val_month - 1).endOf('month').format(DATE_VALUE_FORMAT)
  }
}

export function yearToRange(year) {
  const val_year = parseInt(year, 10)
  if (!val_year) return {}
  return {
    date_from: dayjs().year(val_year).startOf('year').format(DATE_VALUE_FORMAT),
    date_to: dayjs().year(val_year).endOf('year').format(DATE_VALUE_FORMAT)
  }
}

export function buildPeriodParams(state) {
  if (!state?.kind) return {}
  if (state.kind === PERIOD_KIND_YEAR) return yearToRange(state.year)
  if (state.kind === PERIOD_KIND_QUARTER) return quarterToRange(state.year, state.quarter)
  if (state.kind === PERIOD_KIND_MONTH) return monthToRange(state.year, state.month)
  if (state.kind === PERIOD_KIND_FIVE_YEAR) return fiveYearToRange(state.startYear)
  if (state.kind === PERIOD_KIND_STUDY_YEAR) return studyYearToRange(state.studyYear)
  if (state.kind === PERIOD_KIND_RANGE) {
    const out = {}
    if (state.dateFrom) out.date_from = state.dateFrom
    if (state.dateTo) out.date_to = state.dateTo
    return out
  }
  return {}
}
