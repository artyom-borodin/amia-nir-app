<template>
  <div class="nir-page">
    <ReportFilterPanel v-model:period="period" v-model:filters="filters" :fields="REPORT_FILTER_FIELDS[KIND]" @update:period="onChange" @search="onLoad" />
    <ErrorAlert :message="error" />
    <ReportActions :loading="loading" :exporting="exporting" @load="onLoad" @reset="onReset" @export="onExport" />
    <el-card v-loading="loading" class="nir-report-card" :shadow="UI_CARD_SHADOW">
      <div v-if="data">
        <div v-if="items.length" ref="chartRef" class="nir-chart"></div>
        <div v-if="items.length" class="nir-hint nir-hint-top">{{ TEXT_DRILL_HINT }}</div>
        <div class="nir-report-scroll">
          <el-table
            v-if="items.length"
            v-bind="TABLE_ATTRS"
            :data="pagedItems"
            class="nir-report-table"
          >
            <el-table-column v-for="c in columns" :key="c.prop" :prop="c.prop" :label="c.label" :min-width="TABLE_MIN_WIDTH">
              <template #default="scope">
                <ReportCell
                  :row="scope.row"
                  :prop="c.prop"
                  :value="scope.row[c.prop]"
                  :drillable="canDrill(scope.row, c.prop, scope.$index)"
                  @drill="onCell(scope.row, c, scope.$index)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <NirPagination :page="page" :page-size="pageSize" :total="total" @page-change="onPage" @size-change="onSize" />
        <el-empty v-if="!items.length" :description="TEXT_EMPTY" />
        <ReportTotals :totals="totals" @drill="onTotalCell" />
      </div>
      <div v-else class="nir-report-empty-state">
        <el-icon class="nir-report-empty-icon"><component :is="getReportIcon(KIND)" /></el-icon>
        <div class="nir-muted">{{ TEXT_REPORT_IDLE }}</div>
      </div>
    </el-card>
    <DrillDownDrawer v-model="drawer" :title="drillTitle" :rows="drillRows" :columns="drillColumns" :exporting="exporting" @export="onExportDrill" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getReportIcon } from '../constants/icons.js'
import ErrorAlert from '../components/ErrorAlert.vue'
import NirPagination from '../components/NirPagination.vue'
import DrillDownDrawer from './DrillDownDrawer.vue'
import ReportFilterPanel from './ReportFilterPanel.vue'
import ReportCell from './ReportCell.vue'
import { REPORT_FILTER_FIELDS, DYNAMICS_METRICS, REPORT_STRATEGY_KEYS_LENGTH } from '../constants/reports.js'
import ReportActions from './ReportActions.vue'
import ReportTotals from './ReportTotals.vue'
import { useReportPage } from '../composables/useReportPage.js'
import { TEXT_DRILL_HINT, TEXT_EMPTY, TEXT_REPORT_IDLE } from '../constants/texts.js'
import {
  TABLE_MIN_WIDTH,
  TABLE_ATTRS,
  UI_CARD_SHADOW,
  CHART_COLOR_PALETTE,
  CHART_LINE_WIDTH,
  CHART_SYMBOL_SIZE,
  CHART_BAR_MAX_WIDTH,
  CHART_AREA_OPACITY,
  CHART_GRID_PAD
} from '../constants/ui.js'
import { useEcharts } from '../composables/useEcharts.js'
import { REPORT_KIND_DYNAMICS } from '../constants/tables.js'

const KIND = REPORT_KIND_DYNAMICS
const {
  period,
  filters,
  data,
  loading,
  error,
  exporting,
  items,
  columns,
  totals,
  total,
  page,
  pageSize,
  pagedItems,
  drawer,
  drillTitle,
  drillRows,
  drillColumns,
  canDrill,
  onCell,
  onTotalCell,
  onChange,
  onLoad,
  onReset,
  onExport,
  onExportDrill,
  onPage,
  onSize
} = useReportPage(KIND, {
  extraGuard: (prop) => !['year', 'academic_year'].includes(prop),
  objectStrategy: REPORT_STRATEGY_KEYS_LENGTH
})
const chartRef = ref(null)
const years = computed(() => items.value.map((r) => r.year))
const isSinglePoint = computed(() => years.value.length <= 1)

function buildSeriesItem(m) {
  const base = { name: m.label, data: items.value.map((r) => r[m.prop] ?? 0) }
  if (isSinglePoint.value) {
    return { ...base, type: 'bar', barMaxWidth: CHART_BAR_MAX_WIDTH }
  }
  return {
    ...base,
    type: 'line',
    smooth: true,
    symbolSize: CHART_SYMBOL_SIZE,
    lineStyle: { width: CHART_LINE_WIDTH },
    areaStyle: { opacity: CHART_AREA_OPACITY }
  }
}

const chartOption = computed(() => ({
  color: CHART_COLOR_PALETTE,
  grid: CHART_GRID_PAD,
  tooltip: { trigger: 'axis' },
  legend: { data: DYNAMICS_METRICS.map((m) => m.label), top: 0 },
  xAxis: { type: 'category', boundaryGap: isSinglePoint.value, data: years.value },
  yAxis: { type: 'value' },
  series: DYNAMICS_METRICS.map(buildSeriesItem)
}))

useEcharts(chartRef, data, items, chartOption)
</script>
