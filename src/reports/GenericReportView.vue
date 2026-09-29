<template>
  <component :is="current" v-if="current" />
  <div v-else>{{ TEXT_REPORT_NOT_FOUND }}: {{ kind }}</div>
</template>

<script setup>
import { computed } from 'vue'
import { TEXT_REPORT_NOT_FOUND } from '../constants/texts.js'
import { REPORT_VIEW_MAP } from './reportRegistry.js'

const props = defineProps({ kind: { type: String, required: true } })

const current = computed(() => REPORT_VIEW_MAP[props.kind] || null)
</script>
