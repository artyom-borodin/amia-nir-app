<template>
  <div class="nir-page">
    <div class="nir-report-filters">
      <PeriodFilter v-model="period" @update:modelValue="onChange" />
      <FilterPanel v-model="filters" :show-actions="false" :show-search="false" collapsible @search="onLoad">
      <ReportFilters :model-value="filters" :fields="REPORT_FILTER_FIELDS[props.kind]" @update:modelValue="filters = $event" />
    </FilterPanel>
    </div>
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
              <el-link v-if="canDrill(scope.row, c.prop, scope.$index)" :type="BTN_PRIMARY" @click="onCell(scope.row, c, scope.$index)">{{ scope.row[c.prop] }}</el-link>
              <span v-else-if="showCourseTags && c.prop === 'by_course' && isCourseMap(scope.row[c.prop])" class="nir-course-tags">
                <el-tag v-for="(cnt, course) in scope.row[c.prop]" :key="course" :size="UI_SIZE_SMALL">{{ course }} {{ TEXT_COURSE_WORD }}: {{ cnt }}</el-tag>
              </span>
              <span v-else>{{ formatCell(scope.row[c.prop]) }}</span>
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
    <DrillDownDrawer v-model="drawer" :title="drillTitle" :rows="drillRows" :columns="drillColumns" />
  </div>
</template>

<script setup>
import PeriodFilter from '../components/PeriodFilter.vue'
import FilterPanel from '../components/FilterPanel.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import NirPagination from '../components/NirPagination.vue'
import DrillDownDrawer from './DrillDownDrawer.vue'
import ReportFilters from './ReportFilters.vue'
import { REPORT_FILTER_FIELDS } from '../constants/reports.js'
import ReportActions from './ReportActions.vue'
import ReportTotals from './ReportTotals.vue'
import { useReportPage } from '../composables/useReportPage.js'
import { TEXT_DRILL_HINT, TEXT_EMPTY, TEXT_REPORT_IDLE, TEXT_COURSE_WORD } from '../constants/texts.js'
import { TABLE_MIN_WIDTH, TABLE_ATTRS, UI_SIZE_SMALL, BTN_PRIMARY } from '../constants/ui.js'
import { isCourseMap } from './reportHelpers.js'

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
  formatCell,
  onCell,
  onChange,
  onLoad,
  onReset,
  onExport,
  onPage,
  onSize
} = useReportPage(props.kind)
</script>
