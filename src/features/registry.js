import CrudListPage from './_components/CrudListPage.vue'
import { TABLE_KEYS, ENDPOINTS } from '../constants/endpoints.js'
import { REPORT_COLUMN_LABELS } from '../constants/reports.js'
import { validateLearner, validateEventDates, normalizeMonths } from './_shared.js'
import { COLUMNS as CirclesColumns, FILTERS as CirclesFilters, FIELDS as CirclesFields, RULES as CirclesRules, emptyForm as emptyCirclesForm } from './science-circles/schema.js'
import { COLUMNS as GroupsColumns, FILTERS as GroupsFilters, FIELDS as GroupsFields, RULES as GroupsRules, emptyForm as emptyGroupsForm } from './problem-groups/schema.js'
import { COLUMNS as FoundersColumns, FILTERS as FoundersFilters, FIELDS as FoundersFields, RULES as FoundersRules, emptyForm as emptyFoundersForm } from './founders/schema.js'
import { COLUMNS as OrgsColumns, FILTERS as OrgsFilters, FIELDS as OrgsFields, RULES as OrgsRules, emptyForm as emptyOrgsForm } from './implementation-organizations/schema.js'
import { COLUMNS as ConfInfosColumns, FILTERS as ConfInfosFilters, FIELDS as ConfInfosFields, RULES as ConfInfosRules, emptyForm as emptyConfInfosForm } from './conference-infos/schema.js'
import { COLUMNS as ContestInfosColumns, FILTERS as ContestInfosFilters, FIELDS as ContestInfosFields, RULES as ContestInfosRules, emptyForm as emptyContestInfosForm } from './contest-infos/schema.js'
import { COLUMNS as ConfPartsColumns, FILTERS as ConfPartsFilters, FIELDS as ConfPartsFields, RULES as ConfPartsRules, emptyForm as emptyConfPartsForm } from './conference-participations/schema.js'
import { COLUMNS as PubsColumns, FILTERS as PubsFilters, FIELDS as PubsFields, RULES as PubsRules, emptyForm as emptyPubsForm } from './publications/schema.js'
import { COLUMNS as ContestPartsColumns, FILTERS as ContestPartsFilters, FIELDS as ContestPartsFields, RULES as ContestPartsRules, emptyForm as emptyContestPartsForm } from './contest-participations/schema.js'
import { COLUMNS as ActsColumns, FILTERS as ActsFilters, FIELDS as ActsFields, RULES as ActsRules, emptyForm as emptyActsForm } from './implementation-acts/schema.js'
import { COLUMNS as ExhibColumns, FILTERS as ExhibFilters, FIELDS as ExhibFields, RULES as ExhibRules, emptyForm as emptyExhibForm } from './department-exhibitions/schema.js'
import { COLUMNS as StatusesColumns, FILTERS as StatusesFilters, FIELDS as StatusesFields, RULES as StatusesRules, emptyForm as emptyStatusesForm } from './student-statuses/schema.js'
import { COLUMNS as CircleReportsColumns, FILTERS as CircleReportsFilters, FIELDS as CircleReportsFields, RULES as CircleReportsRules, emptyForm as emptyCircleReportsForm } from './circle-reports/schema.js'
import { COLUMNS as PpsDepsColumns, FILTERS as PpsDepsFilters, FIELDS as PpsDepsFields, RULES as PpsDepsRules, emptyForm as emptyPpsDepsForm } from './pps-departments/schema.js'

function formProps(tableKey, fields, rules, eventPreview = null) {
  return { fields, rules, tableKey, eventPreview }
}

export const CRUD_LIST_MAP = {
  [TABLE_KEYS.SCIENCE_CIRCLES]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.SCIENCE_CIRCLES,
      columns: CirclesColumns,
      filterDefs: CirclesFilters,
      emptyForm: emptyCirclesForm,
      formProps: formProps(TABLE_KEYS.SCIENCE_CIRCLES, CirclesFields, CirclesRules)
    }
  },
  [TABLE_KEYS.PROBLEM_GROUPS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.PROBLEM_GROUPS,
      columns: GroupsColumns,
      filterDefs: GroupsFilters,
      emptyForm: emptyGroupsForm,
      formProps: formProps(TABLE_KEYS.PROBLEM_GROUPS, GroupsFields, GroupsRules)
    }
  },
  [TABLE_KEYS.FOUNDERS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.FOUNDERS,
      columns: FoundersColumns,
      filterDefs: FoundersFilters,
      emptyForm: emptyFoundersForm,
      formProps: formProps(TABLE_KEYS.FOUNDERS, FoundersFields, FoundersRules)
    }
  },
  [TABLE_KEYS.IMPLEMENTATION_ORGANIZATIONS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.IMPLEMENTATION_ORGANIZATIONS,
      columns: OrgsColumns,
      filterDefs: OrgsFilters,
      emptyForm: emptyOrgsForm,
      formProps: formProps(TABLE_KEYS.IMPLEMENTATION_ORGANIZATIONS, OrgsFields, OrgsRules)
    }
  },
  [TABLE_KEYS.CONFERENCE_INFOS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.CONFERENCE_INFOS,
      columns: ConfInfosColumns,
      filterDefs: ConfInfosFilters,
      emptyForm: emptyConfInfosForm,
      formProps: formProps(TABLE_KEYS.CONFERENCE_INFOS, ConfInfosFields, ConfInfosRules),
      validate: validateEventDates
    }
  },
  [TABLE_KEYS.CONTEST_INFOS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.CONTEST_INFOS,
      columns: ContestInfosColumns,
      filterDefs: ContestInfosFilters,
      emptyForm: emptyContestInfosForm,
      formProps: formProps(TABLE_KEYS.CONTEST_INFOS, ContestInfosFields, ContestInfosRules),
      validate: validateEventDates
    }
  },
  [TABLE_KEYS.CONFERENCE_PARTS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.CONFERENCE_PARTS,
      columns: ConfPartsColumns,
      filterDefs: ConfPartsFilters,
      emptyForm: emptyConfPartsForm,
      formProps: formProps(TABLE_KEYS.CONFERENCE_PARTS, ConfPartsFields, ConfPartsRules, {
        endpoint: ENDPOINTS.CONFERENCE_INFOS,
        watchProp: 'conference',
        titleLabel: REPORT_COLUMN_LABELS.conference_title
      }),
      validate: validateLearner
    }
  },
  [TABLE_KEYS.PUBLICATIONS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.PUBLICATIONS,
      columns: PubsColumns,
      filterDefs: PubsFilters,
      emptyForm: emptyPubsForm,
      formProps: formProps(TABLE_KEYS.PUBLICATIONS, PubsFields, PubsRules),
      validate: validateLearner
    }
  },
  [TABLE_KEYS.CONTEST_PARTS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.CONTEST_PARTS,
      columns: ContestPartsColumns,
      filterDefs: ContestPartsFilters,
      emptyForm: emptyContestPartsForm,
      formProps: formProps(TABLE_KEYS.CONTEST_PARTS, ContestPartsFields, ContestPartsRules, {
        endpoint: ENDPOINTS.CONTEST_INFOS,
        watchProp: 'contest',
        titleLabel: REPORT_COLUMN_LABELS.contest_title
      }),
      validate: validateLearner,
      normalize: (form) => normalizeMonths(form, ContestPartsFields)
    }
  },
  [TABLE_KEYS.IMPL_ACTS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.IMPL_ACTS,
      columns: ActsColumns,
      filterDefs: ActsFilters,
      emptyForm: emptyActsForm,
      formProps: formProps(TABLE_KEYS.IMPL_ACTS, ActsFields, ActsRules),
      validate: validateLearner
    }
  },
  [TABLE_KEYS.EXHIBITIONS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.EXHIBITIONS,
      columns: ExhibColumns,
      filterDefs: ExhibFilters,
      emptyForm: emptyExhibForm,
      formProps: formProps(TABLE_KEYS.EXHIBITIONS, ExhibFields, ExhibRules),
      validate: validateLearner
    }
  },
  [TABLE_KEYS.STATUSES]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.STATUSES,
      columns: StatusesColumns,
      filterDefs: StatusesFilters,
      emptyForm: emptyStatusesForm,
      formProps: formProps(TABLE_KEYS.STATUSES, StatusesFields, StatusesRules),
      validate: validateLearner
    }
  },
  [TABLE_KEYS.CIRCLE_REPORTS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.CIRCLE_REPORTS,
      columns: CircleReportsColumns,
      filterDefs: CircleReportsFilters,
      emptyForm: emptyCircleReportsForm,
      formProps: formProps(TABLE_KEYS.CIRCLE_REPORTS, CircleReportsFields, CircleReportsRules)
    }
  },
  [TABLE_KEYS.PPS_DEPTS]: {
    component: CrudListPage,
    props: {
      crudKey: TABLE_KEYS.PPS_DEPTS,
      columns: PpsDepsColumns,
      filterDefs: PpsDepsFilters,
      emptyForm: emptyPpsDepsForm,
      formProps: formProps(TABLE_KEYS.PPS_DEPTS, PpsDepsFields, PpsDepsRules)
    }
  }
}
