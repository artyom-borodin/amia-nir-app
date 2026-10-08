import { makeNameSchema } from '../_shared.js'
import { LABEL_ORGANIZATION_NAME } from '../../constants/labels.js'

const SCHEMA = makeNameSchema({ label: LABEL_ORGANIZATION_NAME, entityWord: 'организации' })

export const FIELDS = SCHEMA.fields
export const COLUMNS = SCHEMA.columns
export const RULES = SCHEMA.rules
export const FILTERS = SCHEMA.filters
export const emptyForm = SCHEMA.emptyForm
