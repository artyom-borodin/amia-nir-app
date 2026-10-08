import { makeNameSchema } from '../_shared.js'
import { LABEL_FOUNDER_NAME } from '../../constants/labels.js'

const SCHEMA = makeNameSchema({ label: LABEL_FOUNDER_NAME, entityWord: 'учредителя' })

export const FIELDS = SCHEMA.fields
export const COLUMNS = SCHEMA.columns
export const RULES = SCHEMA.rules
export const FILTERS = SCHEMA.filters
export const emptyForm = SCHEMA.emptyForm
