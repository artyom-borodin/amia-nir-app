<template>
  <div>
    <h2>{{ label }}</h2>
    <component :is="currentView" v-if="currentView" :kind="kind" />
    <div v-else>{{ TEXT_REPORT_NOT_FOUND }}: {{ kind }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TEXT_REPORT_NOT_FOUND } from '../constants/texts.js'
import { getReportLabel, REPORT_KIND_SUMMARY } from '../constants/tables.js'
import SummaryView from '../reports/SummaryView.vue'
import GenericReportView from '../reports/GenericReportView.vue'
import { REPORT_VIEW_MAP } from '../reports/reportRegistry.js'

const props = defineProps({ kind: { type: String, default: REPORT_KIND_SUMMARY } })

const currentView = computed(() => {
  if (props.kind === REPORT_KIND_SUMMARY) return SummaryView
  return REPORT_VIEW_MAP[props.kind] ? GenericReportView : null
})
const label = computed(() => getReportLabel(props.kind))
</script>
