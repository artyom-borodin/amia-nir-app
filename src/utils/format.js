import { TEXT_YES, TEXT_NO } from '../constants/texts.js'
import { LIST_JOINER, KV_JOINER } from '../constants/formats.js'
import {
  DASH_LOCALE,
  BTN_PRIMARY,
  BTN_SUCCESS,
  BTN_WARNING,
  BTN_INFO,
  BADGE_SUCCESS_PROPS,
  BADGE_WARNING_PROPS,
  BADGE_INFO_PROPS,
  BADGE_TAG_PROPS
} from '../constants/ui.js'
import {
  RESULT_NO_CATEGORY,
  SUCCESS_CHOICE_VALUES,
  WARNING_CHOICE_VALUES
} from '../constants/choices.js'

export function formatLocaleNumber(value) {
  return Number(value || 0).toLocaleString(DASH_LOCALE)
}

export function formatBoolCell(value) {
  if (value === true) return TEXT_YES
  if (value === false) return TEXT_NO
  if (value === null || value === undefined) return ''
  return String(value)
}

export function formatTableCell(value) {
  if (Array.isArray(value)) return value.join(LIST_JOINER)
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value)
      .map((key) => key + KV_JOINER + value[key])
      .join(LIST_JOINER)
  }
  return formatBoolCell(value)
}

export function isTagColumn(prop, value) {
  if (value === null || value === undefined || value === '') return false
  if (typeof value === 'boolean') return true
  return BADGE_TAG_PROPS.includes(prop)
}

export function resolveCellTagType(prop, value) {
  if (value === true) {
    if (BADGE_SUCCESS_PROPS.includes(prop)) return BTN_SUCCESS
    if (BADGE_WARNING_PROPS.includes(prop)) return BTN_WARNING
    return BTN_PRIMARY
  }
  if (value === false || BADGE_INFO_PROPS.includes(prop)) return BTN_INFO
  const str = String(value)
  if (str === RESULT_NO_CATEGORY) return BTN_INFO
  if (SUCCESS_CHOICE_VALUES.includes(str)) return BTN_SUCCESS
  if (WARNING_CHOICE_VALUES.includes(str)) return BTN_WARNING
  return BTN_PRIMARY
}
