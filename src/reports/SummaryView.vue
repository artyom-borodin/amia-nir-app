<template>
  <div class="nir-page">
    <div class="nir-report-filters">
      <PeriodFilter v-model="period" @update:modelValue="onChange" />
      <FilterPanel v-model="filters" :show-actions="false" :show-search="false" collapsible @search="onLoad">
        <ReportFilters :model-value="filters" :fields="REPORT_FILTER_FIELDS[KIND]" @update:modelValue="filters = $event" />
      </FilterPanel>
    </div>
    <ErrorAlert :message="error" />
    <ReportActions :loading="loading" :exporting="exporting" @load="onLoad" @reset="onReset" @export="onExport" />
    <el-card v-loading="loading" class="nir-report-card">
      <div v-if="data">
        <div class="nir-hint nir-hint-top">{{ TEXT_DRILL_HINT }}</div>
        <div class="nir-report-scroll">
          <el-table
            v-if="summaryRows.length"
            v-bind="TABLE_ATTRS"
            :data="pagedSummary"
            class="nir-report-table nir-report-table-sm"
          >
            <el-table-column prop="label" :label="TEXT_METRIC" :min-width="TABLE_SUMMARY_LABEL_MIN_WIDTH" />
            <el-table-column prop="value" :label="TEXT_COUNT" :min-width="TABLE_SUMMARY_VALUE_MIN_WIDTH" :width="TABLE_SUMMARY_VALUE_WIDTH">
              <template #default="scope">
                <el-link v-if="canDrillSummary(scope.row)" :type="BTN_PRIMARY" @click="onDrill(scope.row)">{{ scope.row.value }}</el-link>
                <span v-else>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <NirPagination :page="page" :page-size="pageSize" :total="summaryTotal" @page-change="onPage" @size-change="onSize" />
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
import { REPORT_FILTER_FIELDS, SUMMARY_METRIC_LABELS } from '../constants/reports.js'
import ErrorAlert from '../components/ErrorAlert.vue'
import NirPagination from '../components/NirPagination.vue'
import DrillDownDrawer from './DrillDownDrawer.vue'
import ReportActions from './ReportActions.vue'
import { useReportPage } from '../composables/useReportPage.js'
import { TEXT_DRILL_HINT, TEXT_EMPTY, TEXT_REPORT_IDLE, TEXT_METRIC, TEXT_COUNT } from '../constants/texts.js'
import { TABLE_ATTRS, TABLE_SUMMARY_LABEL_MIN_WIDTH, TABLE_SUMMARY_VALUE_MIN_WIDTH, TABLE_SUMMARY_VALUE_WIDTH, BTN_PRIMARY } from '../constants/ui.js'
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
  page,
  pageSize,
  paginateRows,
  onChange,
  onLoad,
  onReset,
  onExport,
  onPage,
  onSize
} = useReportPage(KIND, { reloadOnPeriodChange: true })

const summaryRows = computed(() => normalizeSummary(data.value, SUMMARY_METRIC_LABELS))
const summaryTotal = computed(() => summaryRows.value.length)
const pagedSummary = computed(() => paginateRows(summaryRows.value))

function canDrillSummary(row) {
  if (typeof row.value !== 'number' || row.value === 0) return false
  return hasSummaryDetails(data.value, row.key)
}
</script>

