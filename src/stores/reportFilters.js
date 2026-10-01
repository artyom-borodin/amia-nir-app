import { defineStore } from 'pinia'
import { defaultPeriod } from '../constants/periods.js'

import { STORE_REPORT_FILTERS } from '../constants/stores.js'

export const EMPTY_FILTER_VALUE = ''

export const FILTER_FIELD_NAMES = [
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
  'category',
  'diploma_any',
  'diploma_1',
  'diploma_2',
  'diploma_3',
  'has_certificate',
  'gifted_db',
  'president_fund',
  'search'
]

export const REPORT_FILTER_FIELDS = FILTER_FIELD_NAMES

function defaultFilters() {
  return Object.fromEntries(FILTER_FIELD_NAMES.map((k) => [k, EMPTY_FILTER_VALUE]))
}

function makeDefaultEntry() {
  return { period: defaultPeriod(), filters: defaultFilters() }
}

export const useReportFiltersStore = defineStore(STORE_REPORT_FILTERS, {
  state: () => ({
    byKind: {}
  }),
  actions: {
    ensure(kind) {
      if (!this.byKind[kind]) {
        this.byKind[kind] = makeDefaultEntry()
      }
      return this.byKind[kind]
    },
    setPeriod(kind, period) {
      this.ensure(kind).period = { ...period }
    },
    setFilters(kind, filters) {
      this.ensure(kind).filters = { ...filters }
    },
    reset(kind) {
      this.byKind[kind] = makeDefaultEntry()
    }
  }
})
