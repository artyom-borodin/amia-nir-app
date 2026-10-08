export const UI_PAGE_SIZE = 20
export const UI_DICT_LIMIT = 50
export const UI_DICT_CACHE_LIMIT = 1000
export const UI_SEARCH_DEBOUNCE_MS = 250
export const UI_BLOB_REVOKE_TIMEOUT_MS = 1000
export const UI_DASH_COUNT_BATCH = 4

export const TABLE_ID_WIDTH = 64
export const TABLE_MIN_WIDTH = 150
export const TABLE_DEFAULT_MIN_WIDTH = 180
export const TABLE_ACTIONS_WIDTH = 196
export const TABLE_MAX_HEIGHT = 'var(--nir-table-max-h, var(--nir-table-max-h-fallback))'
export const TABLE_SUMMARY_LABEL_MIN_WIDTH = 240
export const TABLE_SUMMARY_VALUE_MIN_WIDTH = 140
export const TABLE_SUMMARY_VALUE_WIDTH = 170
export const TABLE_DRILL_MIN_WIDTH = 160
export const COL_DATE_W = 130
export const COL_COURSE_W = 80
export const COL_SELECT_W = 170
export const PAGE_SIZES = [10, 20, 50, 100]
export const PAGER_COUNT = 5

export const VISIBLE_FILTERS = 5
export const SORT_DESC = 'descending'
export const ORDER_DESC_PREFIX = '-'

export const DASH_COUNT_RETRIES = 2
export const DASH_COUNT_PROBE = Object.freeze({ limit: 1, offset: 0 })
export const DASH_LOCALE = 'ru-RU'

export const SIDEBAR_MIN_WIDTH = 0
export const SIDEBAR_WIDTH_VAR = '--nir-sidebar-custom-w'
export function cssVar(name) {
  return 'var(' + name + ')'
}

export const DRAWER_FORM_SIZE = 'var(--nir-drawer-form-size)'
export const DRAWER_DRILL_SIZE = 'var(--nir-drawer-drill-size)'

export const TABLE_LAYOUT_AUTO = 'auto'
export const TABLE_SORT_CUSTOM = 'custom'
export const TABLE_FIXED_RIGHT = 'right'
export const TABLE_ID_PROP = 'id'
export const PAGINATION_LAYOUT = 'total, sizes, prev, pager, next'
export const TABLE_ATTRS = Object.freeze({
  stripe: true,
  fit: true,
  scrollbarAlwaysOn: true,
  tableLayout: TABLE_LAYOUT_AUTO,
  maxHeight: TABLE_MAX_HEIGHT
})

export const UI_CARD_SHADOW = 'never'
export const UI_SIZE_SMALL = 'small'
export const BTN_PRIMARY = 'primary'
export const BTN_DANGER = 'danger'
export const BTN_INFO = 'info'

export const POINTER_MOVE_EVT = 'pointermove'
export const POINTER_UP_EVT = 'pointerup'
export const WINDOW_RESIZE_EVT = 'resize'

export const DICT_VALUE_FIELD = 'id'
export const DICT_LABEL_FIELD = 'name'
export const DICT_FULL_NAME_FIELD = 'get_full_name'
export const DICT_SUBDIVISION_FIELD = 'subdivision_name'
export const FILTER_SEARCH_PROP = 'search'
