<template>
  <SchemaForm
    :model-value="modelValue"
    :fields="fields"
    :rules="rules"
    :title="title"
    :event-preview="eventPreview"
    @update:modelValue="$emit('update:modelValue', $event)"
    ref="inner"
  />
</template>
<script setup>
import { computed, ref } from 'vue'
import SchemaForm from '../../components/SchemaForm.vue'
import { getTable } from '../../constants/tables.js'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  fields: { type: Array, default: () => [] },
  rules: { type: Object, default: () => ({}) },
  tableKey: { type: String, default: '' },
  eventPreview: { type: Object, default: null }
})
defineEmits(['update:modelValue'])

const title = computed(() => getTable(props.tableKey)?.title ?? '')

const inner = ref(null)
async function validate() {
  return inner.value ? inner.value.validate() : true
}
defineExpose({ validate })
</script>
