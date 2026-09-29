import CirclesList from './science-circles/views/ListView.vue'
import GroupsList from './problem-groups/views/ListView.vue'
import FoundersList from './founders/views/ListView.vue'
import ConfInfosList from './conference-infos/views/ListView.vue'
import ContestInfosList from './contest-infos/views/ListView.vue'
import ConfPartsList from './conference-participations/views/ListView.vue'
import PubsList from './publications/views/ListView.vue'
import ContestPartsList from './contest-participations/views/ListView.vue'
import ActsList from './implementation-acts/views/ListView.vue'
import ExhibList from './department-exhibitions/views/ListView.vue'
import StatusesList from './student-statuses/views/ListView.vue'
import CircleReportsList from './circle-reports/views/ListView.vue'
import PpsDepsList from './pps-departments/views/ListView.vue'
import { TABLE_KEYS } from '../constants/endpoints.js'

export const CRUD_LIST_MAP = {
  [TABLE_KEYS.SCIENCE_CIRCLES]: CirclesList,
  [TABLE_KEYS.PROBLEM_GROUPS]: GroupsList,
  [TABLE_KEYS.FOUNDERS]: FoundersList,
  [TABLE_KEYS.CONFERENCE_INFOS]: ConfInfosList,
  [TABLE_KEYS.CONTEST_INFOS]: ContestInfosList,
  [TABLE_KEYS.CONFERENCE_PARTS]: ConfPartsList,
  [TABLE_KEYS.PUBLICATIONS]: PubsList,
  [TABLE_KEYS.CONTEST_PARTS]: ContestPartsList,
  [TABLE_KEYS.IMPL_ACTS]: ActsList,
  [TABLE_KEYS.EXHIBITIONS]: ExhibList,
  [TABLE_KEYS.STATUSES]: StatusesList,
  [TABLE_KEYS.CIRCLE_REPORTS]: CircleReportsList,
  [TABLE_KEYS.PPS_DEPTS]: PpsDepsList
}
