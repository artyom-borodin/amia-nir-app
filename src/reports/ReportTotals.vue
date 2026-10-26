<template>
  <div v-if="entries.length" class="nir-totals">
    <div class="nir-totals-title">{{ TEXT_TOTALS }}</div>
    <div class="nir-totals-grid">
      <div
        v-for="e in entries"
        :key="e.key"
        class="nir-totals-item"
        :class="{ 'is-clickable': isDrillableTotal(e) }"
        :title="e.label + KV_JOINER + e.value"
        @click="onItemClick(e)"
      >
        <span class="nir-totals-label">{{ e.label }}</span>
        <el-link
          v-if="isDrillableTotal(e)"
          :type="BTN_PRIMARY"
          :underline="false"
          class="nir-drill-pill nir-totals-value"
        >
          <span>{{ e.value }}</span>
        </el-link>
        <span v-else class="nir-totals-value" :class="{ 'is-zero': e.value === 0 }">{{ e.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { labelFor, isDrillableTotal } from './reportHelpers.js'
import { TEXT_TOTALS } from '../constants/texts.js'
import { KV_JOINER } from '../constants/formats.js'
import { BTN_PRIMARY } from '../constants/ui.js'
import { EMIT_DRILL } from '../constants/events.js'

const props = defineProps({
  totals: { type: Object, default: () => ({}) }
})

const emit = defineEmits([EMIT_DRILL])

const entries = computed(() => {
  const t = props.totals
  if (!t || typeof t !== 'object') return []
  return Object.keys(t)
    .filter((k) => t[k] !== null && t[k] !== undefined)
    .map((k) => ({ key: k, label: labelFor(k), value: t[k] }))
})

function onItemClick(entry) {
  if (!isDrillableTotal(entry)) return
  emit(EMIT_DRILL, entry)
}
</script>
