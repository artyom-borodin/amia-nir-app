<template>
  <div v-if="message">
    <el-alert :title="message" type="error" show-icon :closable="false" class="nir-error-alert" />
    <ul v-if="hasFields" class="nir-error-list">
      <li v-for="e in formattedFields" :key="e.field">{{ e.field + KV_JOINER + e.text }}</li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { KV_JOINER } from '../constants/formats.js'

const props = defineProps({
  message: { type: String, default: '' },
  fields: { type: Object, default: () => ({}) }
})

const formattedFields = computed(() => {
  const src = props.fields ?? {}
  return Object.keys(src).map((field) => {
    const v = src[field]
    const text = Array.isArray(v) ? v.join('; ') : String(v ?? '')
    return { field, text }
  })
})
const hasFields = computed(() => formattedFields.value.length > 0)
</script>
