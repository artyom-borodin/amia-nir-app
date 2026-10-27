import { TABLE_GROUP_RESULTS, TABLE_GROUP_DICTS, MENU_GROUP_REPORTS } from './tables.js'

export const UI_PAGE_SIZE = 20
export const UI_DICT_CACHE_LIMIT = 2000
export const UI_BLOB_REVOKE_TIMEOUT_MS = 1000
export const UI_MOBILE_BP = 768

export const TABLE_ID_WIDTH = 72
export const TABLE_SELECTION_WIDTH = 46
export const TABLE_MIN_WIDTH = 150
export const TABLE_DEFAULT_MIN_WIDTH = 180
export const TABLE_ACTIONS_WIDTH = 200
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

export const SIDEBAR_MIN_WIDTH = 0
export const SIDEBAR_WIDTH_VAR = '--nir-sidebar-custom-w'
export function cssVar(name) {
  return 'var(' + name + ')'
}

export const DRAWER_FORM_SIZE = 'var(--nir-drawer-form-size)'
export const DRAWER_DRILL_SIZE = 'var(--nir-drawer-drill-size)'
export const EXPORT_DIALOG_WIDTH = 'var(--nir-export-dialog-w)'
export const DRAWER_MIN_WIDTH = 320
export const DRAWER_MAX_WIDTH_RATIO = 0.9

export const TABLE_LAYOUT_AUTO = 'auto'
export const TABLE_SORT_CUSTOM = 'custom'
export const TABLE_FIXED_RIGHT = 'right'
export const TABLE_ID_PROP = 'id'
export const PAGINATION_LAYOUT = 'total, sizes, prev, pager, next'

export function onTableCellMouseEnter(_row, column, cell) {
  if (!column || !column.property || column.property === TABLE_ID_PROP || !cell) return
  if (cell.querySelector('.nir-cell-card-trigger')) {
    cell.removeAttribute('title')
    return
  }
  const text = cell.textContent ? cell.textContent.trim() : ''
  if (text) cell.title = text
}

export const TABLE_ATTRS = Object.freeze({
  stripe: true,
  fit: true,
  scrollbarAlwaysOn: true,
  tableLayout: TABLE_LAYOUT_AUTO,
  maxHeight: TABLE_MAX_HEIGHT,
  onCellMouseEnter: onTableCellMouseEnter
})

export const UI_CARD_SHADOW = 'never'
export const UI_SIZE_SMALL = 'small'
export const BTN_PRIMARY = 'primary'
export const BTN_DANGER = 'danger'
export const BTN_INFO = 'info'
export const BTN_SUCCESS = 'success'
export const BTN_WARNING = 'warning'

export const CONFIRM_BOX_CLASS = 'nir-confirm-box'
export const CONFIRM_DANGER_BTN_CLASS = 'el-button--danger'
export const REF_POPPER_CLASS = 'nir-ref-popper'
export const ENTITY_POPOVER_CLASS = 'nir-entity-popover'
export const POPOVER_TRIGGER_HOVER = 'hover'
export const POPOVER_WIDTH = 'var(--nir-ref-popper-w)'
export const POPOVER_SHOW_AFTER_MS = 200
export const POPOVER_HIDE_AFTER_MS = 80
export const POPOVER_PLACEMENT = 'top-start'
export const MULTI_CARD_PREVIEW_LIMIT = 2
export const SHORT_META_LIMIT = 3

export const ENTITY_POPOVER_ATTRS = Object.freeze({
  trigger: POPOVER_TRIGGER_HOVER,
  width: POPOVER_WIDTH,
  placement: POPOVER_PLACEMENT,
  showAfter: POPOVER_SHOW_AFTER_MS,
  hideAfter: POPOVER_HIDE_AFTER_MS,
  popperClass: ENTITY_POPOVER_CLASS
})

export const TAG_EFFECT_LIGHT = 'light'
export const REF_OPTION_BADGE_CLASS = 'nir-ref-option-badge'

export const CARD_TAG_ATTRS = Object.freeze({
  size: UI_SIZE_SMALL,
  effect: TAG_EFFECT_LIGHT,
  class: REF_OPTION_BADGE_CLASS
})

export const MENU_OPENED_DEFAULT = Object.freeze([
  TABLE_GROUP_RESULTS,
  MENU_GROUP_REPORTS,
  TABLE_GROUP_DICTS
])

export const CHART_COLOR_PALETTE = Object.freeze([
  '#1b4f9c',
  '#0d7490',
  '#157347',
  '#b45309',
  '#5b4b8a',
  '#b91c1c'
])
export const CHART_LINE_WIDTH = 2.5
export const CHART_SYMBOL_SIZE = 7
export const CHART_BAR_MAX_WIDTH = 36
export const CHART_AREA_OPACITY = 0.08
export const CHART_GRID_PAD = Object.freeze({
  top: 56,
  right: 24,
  bottom: 28,
  left: 40,
  containLabel: true
})

export const BADGE_SUCCESS_PROPS = Object.freeze([
  'diploma_1',
  'gifted_db',
  'president_fund'
])
export const BADGE_WARNING_PROPS = Object.freeze([
  'diploma_2',
  'diploma_3'
])
export const BADGE_INFO_PROPS = Object.freeze([
  'get_course',
  'course',
  'academic_year',
  'year'
])
export const BADGE_TAG_PROPS = Object.freeze([
  ...BADGE_INFO_PROPS,
  'get_pub_type',
  'get_work_type',
  'get_level',
  'get_result_category',
  'get_result',
  'get_activity_type',
  'pub_type',
  'work_type',
  'result_category',
  'result',
  'activity_type',
  'conference_level',
  'contest_level',
  'category',
  'learner_category'
])

export const POINTER_MOVE_EVT = 'pointermove'
export const POINTER_UP_EVT = 'pointerup'
export const WINDOW_RESIZE_EVT = 'resize'

export const DICT_VALUE_FIELD = 'id'
export const DICT_LABEL_FIELD = 'name'
export const DICT_FULL_NAME_FIELD = 'get_full_name'
export const DICT_SUBDIVISION_FIELD = 'subdivision_name'
export const FILTER_SEARCH_PROP = 'search'
