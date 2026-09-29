import { ref, watch } from 'vue'
import { UPDATE_MODEL_EVENT } from '../constants/events.js'

export function useSyncedLocal(props, emit, apply = (v) => ({ ...v })) {
  const local = ref(props.modelValue ? apply(props.modelValue) : props.modelValue)
  watch(local, (v) => emit(UPDATE_MODEL_EVENT, v), { deep: true })
  watch(
    () => props.modelValue,
    (v) => {
      if (v !== local.value) local.value = v ? apply(v) : v
    },
    { deep: true }
  )
  return { local }
}

export async function validateForm(formRef) {
  if (!formRef.value) return true
  try {
    await formRef.value.validate()
    return true
  } catch (e) {
    return false
  }
}
