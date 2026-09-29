<template>
  <div class="nir-page">
    <div class="nir-report-filters">
      <PeriodFilter v-model="period" @update:modelValue="onChange" />
      <FilterPanel v-model="filters" :show-actions="false" :show-search="false" collapsible @search="onLoad">
        <ReportFilters :model-value="filters" @update:modelValue="filters = $event" />
      </FilterPanel>
    </div>
    <ErrorAlert :message="error" />
    <ReportActions :loading="loading" :exporting="exporting" @load="onLoad" @reset="onReset" @export="onExport" />
    <el-card v-loading="loading" class="nir-report-card">
      <div v-if="data">
        <div class="nir-hint nir-hint-top">{{ TEXT_DRILL_HINT }}</div>
        <div class="nir-report-scroll">
          <el-table v-if="summaryRows.length" :data="summaryRows" stripe fit table-layout="auto" class="nir-report-table nir-report-table-sm">
            <el-table-column prop="label" :label="TEXT_METRIC" :min-width="240" />
            <el-table-column prop="value" :label="TEXT_COUNT" :min-width="140" :width="170">
              <template #default="scope">
                <el-link v-if="canDrillSummary(scope.row)" :type="BTN_PRIMARY" @click="onDrill(scope.row)">{{ scope.row.value }}</el-link>
                <span v-else>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-empty v-if="!summaryRows.length" :description="TEXT_EMPTY" />
      </div>
      <div v-else class="nir-muted">{{ TEXT_REPORT_IDLE }}</div>
    </el-card>
    <DrillDownDrawer v-model="drawer" :title="drillTitle" :rows="drillRows" :columns="drillColumns" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PeriodFilter from '../components/PeriodFilter.vue'
import FilterPanel from '../components/FilterPanel.vue'
import ReportFilters from './ReportFilters.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import DrillDownDrawer from './DrillDownDrawer.vue'
import ReportActions from './ReportActions.vue'
import { useReportPage } from '../composables/useReportPage.js'
import { TEXT_DRILL_HINT, TEXT_EMPTY, TEXT_REPORT_IDLE, TEXT_METRIC, TEXT_COUNT } from '../constants/texts.js'
import { BTN_PRIMARY } from '../constants/ui.js'
import { SUMMARY_METRIC_LABELS } from '../constants/reports.js'
import { REPORT_KIND_SUMMARY } from '../constants/tables.js'
import { normalizeSummary, hasSummaryDetails } from './reportHelpers.js'

const KIND = REPORT_KIND_SUMMARY
const {
  period,
  filters,
  data,
  loading,
  error,
  exporting,
  drawer,
  drillTitle,
  drillRows,
  drillColumns,
  onDrill,
  onChange,
  onLoad,
  onReset,
  onExport
} = useReportPage(KIND, { reloadOnPeriodChange: true })

const summaryRows = computed(() => normalizeSummary(data.value, SUMMARY_METRIC_LABELS))

function canDrillSummary(row) {
  if (typeof row.value !== 'number' || row.value === 0) return false
  return hasSummaryDetails(data.value, row.key)
}
</script>

