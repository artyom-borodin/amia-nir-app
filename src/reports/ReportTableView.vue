<template>
  <div class="nir-page">
    <ReportFilterPanel v-model:period="period" v-model:filters="filters" :fields="REPORT_FILTER_FIELDS[props.kind]" @update:period="onChange" @search="onLoad" />
    <ErrorAlert :message="error" />
    <ReportActions :loading="loading" :exporting="exporting" @load="onLoad" @reset="onReset" @export="onExport" />
    <el-card v-loading="loading" class="nir-report-card">
      <div v-if="data">
        <div class="nir-hint nir-hint-top">{{ TEXT_DRILL_HINT }}</div>
        <div class="nir-report-scroll">
          <el-table
            v-if="items.length"
            v-bind="TABLE_ATTRS"
            :data="pagedItems"
            class="nir-report-table"
          >
          <el-table-column v-for="c in columns" :key="c.prop" :prop="c.prop" :label="c.label" :min-width="TABLE_MIN_WIDTH">
            <template #default="scope">
              <ReportCell :value="scope.row[c.prop]" :drillable="canDrill(scope.row, c.prop, scope.$index)" :show-course-tags="showCourseTags && c.prop === 'by_course'" @drill="onCell(scope.row, c, scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
          </div>
        <NirPagination :page="page" :page-size="pageSize" :total="total" @page-change="onPage" @size-change="onSize" />
        <el-empty v-if="!items.length" :description="TEXT_EMPTY" />
        <ReportTotals :totals="totals" />
      </div>
      <div v-else class="nir-muted">{{ TEXT_REPORT_IDLE }}</div>
    </el-card>
    <DrillDownDrawer v-model="drawer" :title="drillTitle" :rows="drillRows" :columns="drillColumns" :exporting="exporting" @export="onExportDrill" />
  </div>
</template>

<script setup>
import ErrorAlert from '../components/ErrorAlert.vue'
import NirPagination from '../components/NirPagination.vue'
import DrillDownDrawer from './DrillDownDrawer.vue'
import ReportFilterPanel from './ReportFilterPanel.vue'
import ReportCell from './ReportCell.vue'
import { REPORT_FILTER_FIELDS } from '../constants/reports.js'
import ReportActions from './ReportActions.vue'
import ReportTotals from './ReportTotals.vue'
import { useReportPage } from '../composables/useReportPage.js'
import { TEXT_DRILL_HINT, TEXT_EMPTY, TEXT_REPORT_IDLE } from '../constants/texts.js'
import { TABLE_MIN_WIDTH, TABLE_ATTRS } from '../constants/ui.js'

const props = defineProps({
  kind: { type: String, required: true },
  showCourseTags: { type: Boolean, default: false }
})

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
  onChange,
  onLoad,
  onReset,
  onExport,
  onExportDrill,
  onPage,
  onSize
} = useReportPage(props.kind)
</script>
