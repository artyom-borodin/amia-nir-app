<template>
  <div class="nir-crud">
    <div class="nir-page-header">
      <div class="nir-page-titles">
        <div class="nir-breadcrumbs">
          <router-link :to="ROUTE_HOME" class="nir-breadcrumb-link">{{ TEXT_HOME }}</router-link>
          <span class="nir-breadcrumb-sep">/</span>
          <span class="nir-breadcrumb-group">{{ TEXT_REPORTS }}</span>
        </div>
        <h2 class="nir-crud-title">{{ label }}</h2>
      </div>
    </div>
    <component :is="currentView" v-if="currentView" :kind="kind" />
    <div v-else>{{ TEXT_REPORT_NOT_FOUND }}: {{ kind }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ROUTE_HOME } from '../constants/routes.js'
import { TEXT_REPORT_NOT_FOUND, TEXT_HOME, TEXT_REPORTS } from '../constants/texts.js'
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
