import {
  DICT_VALUE_FIELD,
  DICT_LABEL_FIELD,
  BTN_PRIMARY,
  BTN_INFO,
  SHORT_META_LIMIT
} from '../constants/ui.js'
import {
  LABEL_SEPARATOR,
  FIO_SEPARATOR,
  LEARNER_KIND_CADET,
  LEARNER_KIND_STUDENT,
  LEARNER_KIND_FPK,
  FPK_MAG_CHOICE_MAGISTRACY,
  TEXT_MAGISTRACY,
  STATUS_GRADUATED_SUFFIX,
  LEARNER_STATUS_LABELS
} from '../constants/choices.js'
import {
  TITLE_SEPARATOR,
  LIST_JOINER,
  KV_JOINER,
  DOT_JOINER,
  withParens
} from '../constants/formats.js'
import {
  TEXT_FOUNDER,
  TEXT_FOUNDER_LABEL,
  TEXT_GROUP_SHORT,
  TEXT_RECORD_BOOK_SHORT,
  TEXT_BIRTH_SHORT,
  TEXT_SUPERVISOR_PREFIX,
  TEXT_MEMBERS_COUNT_LABEL,
  formatCourseLabel
} from '../constants/texts.js'
import { ENDPOINTS } from '../constants/endpoints.js'
import {
  TABLE_MEMBERS_COUNT_PROP,
  TECHNICAL_ID_SUFFIX,
  TECHNICAL_IDS_SUFFIX
} from '../constants/reports.js'
import { isEmptyValue } from '../constants/api.js'
import { LEARNER_DEFS, getRowLabel } from '../features/_shared.js'
import { resolveCellTagType } from './format.js'

export const LEARNER_ENDPOINT_SPECS = Object.freeze(
  LEARNER_DEFS.map(({ prop, listProp, ref }) => ({
    kind: prop,
    endpoint: ref,
    idProps: [prop, prop + TECHNICAL_ID_SUFFIX],
    listProps: [listProp, listProp + TECHNICAL_IDS_SUFFIX]
  }))
)

const SUBDIVISION_CELL_PROPS = Object.freeze([
  'department_name',
  'learner_subdivision',
  'subdivision',
  'faculty',
  'department'
])

const LEARNER_SUBDIV_PROPS = Object.freeze(['learner_subdivision', 'subdivision', 'faculty'])

export function inferEndpointKind(normEndpoint) {
  return LEARNER_ENDPOINT_SPECS.find((s) => s.endpoint === normEndpoint)?.kind || ''
}

export function isMetaObject(m) {
  return typeof m === 'object' && m !== null
}

export function formatMetaItem(m) {
  if (isMetaObject(m)) {
    return [m.label, m.value].filter(Boolean).join(' ')
  }
  return String(m || '')
}

export function buildShortMeta(card) {
  if (!card || !Array.isArray(card.meta)) return ''
  return card.meta
    .slice(0, SHORT_META_LIMIT)
    .map(formatMetaItem)
    .filter(Boolean)
    .join(DOT_JOINER)
}

export function createCard({ title = '', badge = null, tag = null, subtitle = '', meta = [] } = {}) {
  return {
    rich: Boolean(badge || tag || subtitle || meta.length),
    title: String(title || ''),
    badge,
    tag,
    subtitle,
    meta
  }
}

export function plainCard(title) {
  return createCard({ title })
}

export function formatFio(row) {
  if (!row) return ''
  const parts = [row.last_name_rus, row.first_name_rus, row.patronymic_rus].filter(Boolean)
  if (parts.length) return parts.join(FIO_SEPARATOR)
  return row.get_full_name ? String(row.get_full_name) : ''
}

export function formatDateRange(start, end) {
  if (start && end && start !== end) return String(start) + TITLE_SEPARATOR + String(end)
  if (start) return String(start)
  if (end) return String(end)
  return ''
}

export function isLearnerRow(row) {
  return Boolean(row && row.last_name_rus && ('student_record_book_number' in row || 'get_group' in row))
}

function asString(v) {
  return typeof v === 'string' ? v : ''
}

function asNumber(v) {
  return typeof v === 'number' ? v : null
}

function isGraduatedRow(row) {
  return row.is_active === false || Boolean(row.academy_end_date)
}

function detectLearnerKind(row, fallbackKind = '') {
  if (fallbackKind) return fallbackKind
  if ('fpk_mag_choice' in row || 'get_fpk_mag_choice' in row || 'place_of_work_position' in row) {
    return LEARNER_KIND_FPK
  }
  if ('contract_number' in row || 'year_litera' in row) {
    return LEARNER_KIND_STUDENT
  }
  if ('student_record_book_number' in row || 'get_group' in row) {
    return LEARNER_KIND_CADET
  }
  return ''
}

function inferLearnerCategory(row, fallbackKind = '') {
  if (row.get_category) return String(row.get_category)
  if (row.learner_category) return String(row.learner_category)
  if (asString(row.category)) return row.category
  const graduated = isGraduatedRow(row)
  const kind = detectLearnerKind(row, fallbackKind)
  if (kind === LEARNER_KIND_FPK) {
    const isMag =
      row.fpk_mag_choice === FPK_MAG_CHOICE_MAGISTRACY || row.get_fpk_mag_choice === TEXT_MAGISTRACY
    if (isMag) {
      return graduated ? LEARNER_STATUS_LABELS.magistrantGraduated : LEARNER_STATUS_LABELS.magistrant
    }
    return graduated ? LEARNER_STATUS_LABELS.listenerGraduated : LEARNER_STATUS_LABELS.listener
  }
  if (kind === LEARNER_KIND_STUDENT) {
    return graduated ? LEARNER_STATUS_LABELS.studentGraduated : LEARNER_STATUS_LABELS.student
  }
  if (kind === LEARNER_KIND_CADET) {
    return graduated ? LEARNER_STATUS_LABELS.cadetGraduated : LEARNER_STATUS_LABELS.cadet
  }
  return ''
}

function splitSupervisorDisplay(row) {
  const dept = row.department_name ? String(row.department_name) : ''
  if (!row.supervisor_display) return { fio: '', dept }
  const parts = String(row.supervisor_display).split(LABEL_SEPARATOR)
  return {
    fio: parts[0] || String(row.supervisor_display),
    dept: dept || parts.slice(1).join(LABEL_SEPARATOR) || ''
  }
}

export function buildLearnerOption(row, fallbackKind = '') {
  const fio = formatFio(row) || String(row.student_fio || row.fio || '')
  const statusText = inferLearnerCategory(row, fallbackKind)
  const graduated = isGraduatedRow(row) || statusText.includes(STATUS_GRADUATED_SUFFIX)
  const badge = statusText ? { text: statusText, type: graduated ? BTN_INFO : BTN_PRIMARY } : null
  const subdiv =
    row.get_subdivision ||
    row.learner_subdivision ||
    asString(row.subdivision) ||
    asString(row.faculty) ||
    ''
  const group = row.get_group || row.learner_group || asString(row.group) || ''
  const meta = [
    subdiv ? String(subdiv) : null,
    group ? { label: TEXT_GROUP_SHORT, value: String(group) } : null,
    row.year ? formatCourseLabel(row.year) : null,
    row.student_record_book_number
      ? { label: TEXT_RECORD_BOOK_SHORT, value: String(row.student_record_book_number) }
      : null,
    row.date_of_birth ? { label: TEXT_BIRTH_SHORT, value: String(row.date_of_birth) } : null,
    row.get_rank ? String(row.get_rank) : null
  ].filter(Boolean)
  const subtitle = String(row.get_speciality || row.place_of_work_position || '')
  const summaryParts = [
    group ? TEXT_GROUP_SHORT + ' ' + String(group) : '',
    row.student_record_book_number ? '№ ' + String(row.student_record_book_number) : ''
  ].filter(Boolean)
  const label = withParens(fio, summaryParts.join(LIST_JOINER))
  return {
    label,
    card: createCard({ title: fio, badge, subtitle, meta })
  }
}

export function buildEmployeeOption(row) {
  let fio = formatFio(row)
  let subdiv = row.get_subdivision ? String(row.get_subdivision) : ''
  if (!fio) {
    if (row.supervisor_display) {
      const parsed = splitSupervisorDisplay(row)
      fio = parsed.fio
      subdiv = subdiv || parsed.dept
    } else {
      fio = String(row.pps || row.fio || '')
      subdiv = subdiv || String(row.department_name || asString(row.department) || '')
    }
  }
  const subtitle = row.get_position ? String(row.get_position) : ''
  const meta = [row.get_rank, row.get_category].filter(Boolean).map(String)
  const badge = subdiv ? { text: subdiv, type: BTN_PRIMARY } : null
  return {
    label: fio + (subdiv ? LABEL_SEPARATOR + subdiv : ''),
    card: createCard({ title: fio, badge, subtitle, meta })
  }
}

export function buildEventOption(row) {
  const title = String(row.title || row.conference_title || row.contest_title || '')
  const levelText = String(
    row.get_level || row.level || row.conference_level || row.contest_level || ''
  )
  const tag = levelText ? { text: levelText, type: resolveCellTagType('get_level', levelText) } : null
  const dates = formatDateRange(
    row.start_date || row.conference_start_date || row.contest_start_date,
    row.end_date || row.conference_end_date || row.contest_end_date
  )
  const city = String(row.city || row.conference_city || row.contest_city || '')
  const meta = [dates, city].filter(Boolean)
  const founder = row.founder_name || row.conference_founder_name || row.contest_founder_name || ''
  const subtitle = founder ? TEXT_FOUNDER + KV_JOINER + String(founder) : ''
  return {
    label: withParens(title, meta.join(LIST_JOINER)),
    card: createCard({ title, tag, subtitle, meta })
  }
}

export function buildConferenceLinkOption(row) {
  const hasReport = Boolean(row.report_title || row.conference_report_title)
  const title = String(row.report_title || row.conference_report_title || row.conference_title || '')
  const workType = String(row.get_work_type || row.work_type || row.conference_work_type || '')
  const tag = workType ? { text: workType, type: resolveCellTagType('get_work_type', workType) } : null
  const confTitle = hasReport && row.conference_title ? String(row.conference_title) : ''
  const founder = row.conference_founder_name || row.founder_name || ''
  const subtitle = confTitle || (founder ? TEXT_FOUNDER + KV_JOINER + String(founder) : '')
  const dates = formatDateRange(row.conference_start_date, row.conference_end_date)
  const meta = [
    dates,
    row.conference_city ? String(row.conference_city) : null,
    row.conference_level ? String(row.conference_level) : null,
    confTitle && founder ? { label: TEXT_FOUNDER_LABEL, value: String(founder) } : null,
    row.student_fio ? String(row.student_fio) : null
  ].filter(Boolean)
  return {
    label: title + (confTitle ? LABEL_SEPARATOR + confTitle : ''),
    card: createCard({ title, tag, subtitle, meta })
  }
}

export function buildSubdivisionOption(row) {
  const shortName = row.subdivision_short_name ? String(row.subdivision_short_name) : ''
  const fullName = row.subdivision_name ? String(row.subdivision_name) : ''
  const fallbackName = String(
    row.department_name ||
      row.learner_subdivision ||
      asString(row.subdivision) ||
      asString(row.faculty) ||
      asString(row.department) ||
      row.name ||
      ''
  )
  const title = shortName || fullName || fallbackName
  const subtitle = shortName && fullName && shortName !== fullName ? fullName : ''
  const category = row.get_category ? String(row.get_category) : ''
  const badge = category ? { text: category, type: BTN_INFO } : null
  return {
    label: title,
    card: createCard({ title, badge, subtitle })
  }
}

export function buildProblemGroupOption(row) {
  const title = String(row.name || row.problem_group_name || row.group_name || '')
  const circle = row.circle_name ? String(row.circle_name) : ''
  const { fio: supFio, dept } = splitSupervisorDisplay(row)
  const subtitle = supFio ? TEXT_SUPERVISOR_PREFIX + KV_JOINER + supFio : ''
  const meta = [
    dept || null,
    row.circle_year ? String(row.circle_year) : null,
    row.members_count ? { label: TEXT_MEMBERS_COUNT_LABEL, value: String(row.members_count) } : null
  ].filter(Boolean)
  const badge = circle ? { text: circle, type: BTN_PRIMARY } : null
  return {
    label: title,
    card: createCard({ title, badge, subtitle, meta })
  }
}

export function buildScienceCircleOption(row) {
  const title = String(row.name || row.circle_name || '')
  const year = row.year || row.circle_year ? String(row.year || row.circle_year) : ''
  const badge = year ? { text: year, type: BTN_INFO } : null
  return {
    label: withParens(title, year),
    card: createCard({ title, badge })
  }
}

export function pickValue(row, valueField = DICT_VALUE_FIELD) {
  return row[valueField] ?? row[DICT_VALUE_FIELD]
}

export function pickFallbackLabel(row, field = DICT_LABEL_FIELD) {
  if (row.group_name) return String(row.group_name)
  if (row[field]) return String(row[field])
  return String(row.name || getRowLabel(row))
}

const OPTION_BUILDERS = [
  { test: isLearnerRow, build: (row, kind) => buildLearnerOption(row, kind) },
  { test: (row) => Boolean(row.last_name_rus || row.get_full_name), build: buildEmployeeOption },
  { test: (row) => Boolean(row.report_title), build: buildConferenceLinkOption },
  { test: (row) => Boolean(row.title && row.start_date), build: buildEventOption },
  {
    test: (row) => Boolean(row.name && (row.circle_name || row.supervisor_display)),
    build: buildProblemGroupOption
  },
  { test: (row) => Boolean(row.name && row.year), build: buildScienceCircleOption },
  { test: (row) => Boolean(row.subdivision_name), build: buildSubdivisionOption }
]

export function buildOptionDescriptor(row, labelField = DICT_LABEL_FIELD, fallbackKind = '') {
  for (const item of OPTION_BUILDERS) {
    if (item.test(row)) return item.build(row, fallbackKind)
  }
  const label = pickFallbackLabel(row, labelField)
  return { label, card: plainCard(label) }
}

const SEARCHABLE_ROW_KEYS = Object.freeze([
  'id',
  'last_name_rus',
  'first_name_rus',
  'patronymic_rus',
  'get_full_name',
  'student_record_book_number',
  'get_group',
  'group_name',
  'year',
  'date_of_birth',
  'entrance_year',
  'get_subdivision',
  'subdivision_name',
  'subdivision_short_name',
  'get_category',
  'get_fpk_mag_choice',
  'get_rank',
  'get_position',
  'get_speciality',
  'get_specialization',
  'place_of_work_position',
  'department_name',
  'title',
  'name',
  'city',
  'start_date',
  'end_date',
  'founder_name',
  'get_level',
  'level',
  'report_title',
  'conference_title',
  'conference_city',
  'conference_level',
  'conference_start_date',
  'conference_end_date',
  'get_work_type',
  'work_type',
  'student_fio',
  'circle_name',
  'supervisor_display'
])

export function buildSearchText(row, label, card) {
  const parts = [
    label,
    card.title,
    card.badge ? card.badge.text : '',
    card.tag ? card.tag.text : '',
    card.subtitle,
    ...(card.meta || []).map(formatMetaItem)
  ]
  for (const k of SEARCHABLE_ROW_KEYS) {
    const v = row[k]
    if (!isEmptyValue(v)) parts.push(String(v))
  }
  return parts.filter(Boolean).join(' ').toLowerCase()
}

export function matchSearchTokens(item, query) {
  const q = String(query || '').trim().toLowerCase()
  if (!q) return true
  const tokens = q.split(/\s+/).filter(Boolean)
  return tokens.every((t) => item.searchText.includes(t))
}

function extractLearnerRef(row) {
  if (!row) return null
  for (const spec of LEARNER_ENDPOINT_SPECS) {
    for (const prop of spec.idProps) {
      const id = asNumber(row[prop])
      if (id && id > 0) {
        return { endpoint: spec.endpoint, id, kind: spec.kind }
      }
    }
  }
  const key = row.learner || row.learner_key || asString(row.student)
  if (key && String(key).includes(':')) {
    const [kind, rawId] = String(key).split(':')
    const id = Number(rawId)
    const spec = LEARNER_ENDPOINT_SPECS.find((s) => s.kind === kind)
    if (spec && Number.isFinite(id) && id > 0) {
      return { endpoint: spec.endpoint, id, kind: spec.kind }
    }
  }
  return null
}

function resolveCardWithFallback(store, endpoint, id, hasFallback, buildFn) {
  if (!isEmptyValue(id)) {
    const dictCard = store?.getCard(endpoint, id)
    if (dictCard) return [dictCard]
  }
  return hasFallback ? [buildFn().card] : null
}

function resolveMemberCards(row, prop, store) {
  if (prop === TABLE_MEMBERS_COUNT_PROP && (!row.members_count || Number(row.members_count) <= 0)) {
    return null
  }
  const cards = []
  for (const spec of LEARNER_ENDPOINT_SPECS) {
    const ids = row[spec.listProps[0]] || row[spec.listProps[1]] || []
    for (const id of ids) {
      const c = store?.getCard(spec.endpoint, id)
      if (c) cards.push(c)
    }
  }
  if (cards.length) return cards
  if (Array.isArray(row.members_fio) && row.members_fio.length) {
    return row.members_fio.map(plainCard)
  }
  return null
}

export function resolveCellCards(row, prop, store) {
  if (!row || !prop) return null

  if (
    prop === 'student_fio' ||
    (prop === 'fio' && (extractLearnerRef(row) || row.category || row.group))
  ) {
    const ref = extractLearnerRef(row)
    return resolveCardWithFallback(
      store,
      ref?.endpoint,
      ref?.id,
      !isEmptyValue(row[prop]),
      () => buildLearnerOption(row, ref?.kind || '')
    )
  }

  if (prop === 'members_fio' || prop === TABLE_MEMBERS_COUNT_PROP) {
    return resolveMemberCards(row, prop, store)
  }

  if (prop === 'supervisor_display' || prop === 'pps') {
    return resolveCardWithFallback(
      store,
      ENDPOINTS.EMPLOYEE,
      row.supervisor ?? row.supervisor_id,
      !isEmptyValue(row[prop]),
      () => buildEmployeeOption(row)
    )
  }

  if (prop === 'conference_title') {
    const linkId = row.conference_link ?? row.conference_link_id
    if (!isEmptyValue(linkId)) {
      return resolveCardWithFallback(
        store,
        ENDPOINTS.CONFERENCE_PARTS,
        linkId,
        !isEmptyValue(row.conference_title) || !isEmptyValue(row.conference_report_title),
        () => buildConferenceLinkOption(row)
      )
    }
    return resolveCardWithFallback(
      store,
      ENDPOINTS.CONFERENCE_INFOS,
      row.conference ?? row.conference_id,
      !isEmptyValue(row.conference_title),
      () => (!isEmptyValue(row.conference_report_title) ? buildConferenceLinkOption(row) : buildEventOption(row))
    )
  }

  if (prop === 'contest_title') {
    return resolveCardWithFallback(
      store,
      ENDPOINTS.CONTEST_INFOS,
      row.contest ?? row.contest_id,
      !isEmptyValue(row.contest_title),
      () => buildEventOption(row)
    )
  }

  if (prop === 'problem_group_name' || prop === 'group_name') {
    const groupId = row.problem_group ?? row.problem_group_id ?? (prop === 'group_name' ? row.id : null)
    return resolveCardWithFallback(
      store,
      ENDPOINTS.PROBLEM_GROUPS,
      groupId,
      !isEmptyValue(row[prop]),
      () => buildProblemGroupOption(row)
    )
  }

  if (
    prop === 'circle_name' ||
    (prop === 'name' && typeof row.circle === 'number' && row.circle_name === undefined)
  ) {
    const circleId = row.circle ?? row.circle_id ?? row.problem_group__circle_id
    return resolveCardWithFallback(
      store,
      ENDPOINTS.SCIENCE_CIRCLES,
      circleId,
      !isEmptyValue(row[prop]),
      () => buildScienceCircleOption(row)
    )
  }

  const isSubdivisionProp =
    SUBDIVISION_CELL_PROPS.includes(prop) ||
    (prop === 'name' &&
      (typeof row.department === 'number' || typeof row.faculty === 'number') &&
      row.department_name === undefined)

  if (isSubdivisionProp) {
    const facultyId = asNumber(row.faculty)
    const subId = LEARNER_SUBDIV_PROPS.includes(prop)
      ? row.learner_subdivision_id ?? facultyId
      : asNumber(row.department) ??
        row.department_id ??
        row.supervisor__subdivision_id ??
        facultyId

    if (!isEmptyValue(subId)) {
      const dictCard = store?.getCard(ENDPOINTS.SUBDIVISION, subId)
      if (dictCard) return [dictCard]
    }
    const textVal = asString(row[prop])
    if (textVal) {
      const byLabel = store?.getCardByLabel(ENDPOINTS.SUBDIVISION, textVal)
      return [byLabel || buildSubdivisionOption(row).card]
    }
    return null
  }

  return null
}
