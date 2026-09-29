import { makeCrud } from './crud.js'
import { PAGINATION_LIMIT_KEY, PAGINATION_OFFSET_KEY } from '../constants/api.js'
import { DASH_COUNT_PROBE } from '../constants/ui.js'


export async function getTableCount(endpoint) {
  const { count } = await makeCrud(endpoint).list({
    [PAGINATION_LIMIT_KEY]: DASH_COUNT_PROBE.limit,
    [PAGINATION_OFFSET_KEY]: DASH_COUNT_PROBE.offset
  })
  return count
}
