import { CONF_LEVEL } from '../../constants/choices.js'
import { makeEventSchema } from '../_shared.js'
import { REPORT_COLUMN_LABELS } from '../../constants/reports.js'

const SCHEMA = makeEventSchema({
  titleLabel: REPORT_COLUMN_LABELS.conference_title,
  levelLabel: REPORT_COLUMN_LABELS.conference_level,
  levelOptions: CONF_LEVEL,
  entityWord: 'конференции',
  levelPrompt: 'Выберите уровень конференции'
})

export const FIELDS = SCHEMA.fields
export const COLUMNS = SCHEMA.columns
export const RULES = SCHEMA.rules
export const FILTERS = SCHEMA.filters
export const emptyForm = SCHEMA.emptyForm
