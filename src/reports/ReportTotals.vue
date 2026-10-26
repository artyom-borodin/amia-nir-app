<template>
  <div v-if="entries.length" class="nir-totals">
    <div class="nir-totals-title">{{ TEXT_TOTALS }}</div>
    <div class="nir-totals-grid">
      <div v-for="e in entries" :key="e.key" class="nir-totals-item" :title="e.label + KV_JOINER + e.value">
        <span class="nir-totals-label">{{ e.label }}</span>
        <span class="nir-totals-value" :class="{ 'is-zero': e.value === 0 }">{{ e.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { labelFor } from './reportHelpers.js'
import { TEXT_TOTALS } from '../constants/texts.js'
import { KV_JOINER } from '../constants/formats.js'

const props = defineProps({
  totals: { type: Object, default: () => ({}) }
})

const entries = computed(() => {
  const t = props.totals
  if (!t || typeof t !== 'object') return []
  return Object.keys(t)
    .filter((k) => t[k] !== null && t[k] !== undefined)
    .map((k) => ({ key: k, label: labelFor(k), value: t[k] }))
})
</script>

