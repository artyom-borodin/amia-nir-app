<template>
  <SchemaForm
    :model-value="modelValue"
    :fields="FIELDS"
    :rules="RULES"
    :title="title"
    @update:modelValue="$emit('update:modelValue', $event)"
    ref="inner"
  />
</template>
<script setup>
import { computed, ref } from 'vue'
import SchemaForm from '../../../components/SchemaForm.vue'
import { FIELDS, RULES } from '../schema.js'
import { getTable } from '../../../constants/tables.js'
import { TABLE_KEYS } from '../../../constants/endpoints.js'

defineProps({ modelValue: { type: Object, default: () => ({}) } })
defineEmits(['update:modelValue'])

const title = computed(() => getTable(TABLE_KEYS.SCIENCE_CIRCLES)?.title ?? '')

const inner = ref(null)
async function validate() {
  return inner.value ? inner.value.validate() : true
}
defineExpose({ validate })
</script>
