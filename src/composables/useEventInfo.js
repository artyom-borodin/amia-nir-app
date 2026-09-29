import { ref, watch } from 'vue'
import { makeCrud } from '../api/crud.js'
import { getEndpoint } from '../constants/tables.js'
import { isEmptyValue } from '../constants/api.js'

export function useEventInfo(endpointKey, idGetter) {
  const eventInfo = ref(null)

  async function loadEventInfo(id) {
    if (isEmptyValue(id)) {
      eventInfo.value = null
      return
    }
    try {
      eventInfo.value = await makeCrud(getEndpoint(endpointKey)).get(id)
    } catch (e) {
      eventInfo.value = null
    }
  }

  if (endpointKey && idGetter) {
    watch(idGetter, loadEventInfo, { immediate: true })
  }

  return { eventInfo, loadEventInfo }
}
