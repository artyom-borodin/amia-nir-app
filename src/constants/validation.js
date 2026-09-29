export const TRIGGER_BLUR = 'blur'
export const TRIGGER_CHANGE = 'change'

export const ACADEMIC_YEAR_RE = /^\d{4}\/\d{4}$/
export const YEAR_OR_ACADEMIC_YEAR_RE = /^(\d{4}|\d{4}\/\d{4})$/

export const FORMAT_ACADEMIC_YEAR = 'Формат 2025/2026'
export const FORMAT_YEAR_OR_ACADEMIC_YEAR = 'Формат 2025 или 2025/2026'

export function requiredBlur(message) {
  return { required: true, message, trigger: TRIGGER_BLUR }
}

export function requiredChange(message) {
  return { required: true, message, trigger: TRIGGER_CHANGE }
}
