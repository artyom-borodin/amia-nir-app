import { TEXT_YES, TEXT_NO } from '../constants/texts.js'
import { LIST_JOINER, KV_JOINER } from '../constants/formats.js'

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
