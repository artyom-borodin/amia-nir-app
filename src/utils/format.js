import { TEXT_YES, TEXT_NO } from '../constants/texts.js'

export function formatBoolCell(value) {
  if (value === true) return TEXT_YES
  if (value === false) return TEXT_NO
  if (value === null || value === undefined) return ''
  return String(value)
}
