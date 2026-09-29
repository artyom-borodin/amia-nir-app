export const DIPLOMA_FILTER_ANY = 'any'
export const DIPLOMA_FILTER_NONE = 'none'
export const DIPLOMA_FILTER_D1 = '1'
export const DIPLOMA_FILTER_D2 = '2'
export const DIPLOMA_FILTER_D3 = '3'
export const DIPLOMA_TRUE = 'true'
export const DIPLOMA_FALSE = 'false'
export const DIPLOMA_EMPTY = ''

export function encodeDiploma(v) {
  return {
    diploma_any: v === DIPLOMA_FILTER_ANY ? DIPLOMA_TRUE : v === DIPLOMA_FILTER_NONE ? DIPLOMA_FALSE : DIPLOMA_EMPTY,
    diploma_1: v === DIPLOMA_FILTER_D1 ? DIPLOMA_TRUE : DIPLOMA_EMPTY,
    diploma_2: v === DIPLOMA_FILTER_D2 ? DIPLOMA_TRUE : DIPLOMA_EMPTY,
    diploma_3: v === DIPLOMA_FILTER_D3 ? DIPLOMA_TRUE : DIPLOMA_EMPTY
  }
}

export function isOn(v) {
  return v === true || v === DIPLOMA_TRUE
}

export function decodeDiploma(model) {
  if (isOn(model.diploma_any)) return DIPLOMA_FILTER_ANY
  if (model.diploma_any === DIPLOMA_FALSE || model.diploma_any === false) return DIPLOMA_FILTER_NONE
  if (isOn(model.diploma_1)) return DIPLOMA_FILTER_D1
  if (isOn(model.diploma_2)) return DIPLOMA_FILTER_D2
  if (isOn(model.diploma_3)) return DIPLOMA_FILTER_D3
  return DIPLOMA_EMPTY
}

export const DIPLOMA_OPTIONS = [
  { value: DIPLOMA_FILTER_ANY, label: 'С дипломом (любой)' },
  { value: DIPLOMA_FILTER_D1, label: 'Диплом 1 степени' },
  { value: DIPLOMA_FILTER_D2, label: 'Диплом 2 степени' },
  { value: DIPLOMA_FILTER_D3, label: 'Диплом 3 степени' },
  { value: DIPLOMA_FILTER_NONE, label: 'Без диплома' }
]
