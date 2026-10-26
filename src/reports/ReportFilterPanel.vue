<template>
  <div class="nir-report-filters">
    <PeriodFilter :model-value="period" @update:modelValue="$emit(UPDATE_PERIOD_EVENT, $event)" />
    <FilterPanel :model-value="filters" :show-actions="false" :show-search="false" collapsible @search="$emit(EMIT_SEARCH)">
      <ReportFilters :model-value="filters" :fields="fields" @update:modelValue="$emit(UPDATE_FILTERS_EVENT, $event)" />
    </FilterPanel>
    <ActiveFilterTags
      :filters="normalizedFilters"
      :filter-defs="activeFilterDefs"
      class="nir-report-active-filters"
      @remove="onRemoveFilter"
      @clear="onClearFilters"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PeriodFilter from '../components/PeriodFilter.vue'
import FilterPanel from '../components/FilterPanel.vue'
import ActiveFilterTags from '../components/ActiveFilterTags.vue'
import ReportFilters from './ReportFilters.vue'
import { UPDATE_PERIOD_EVENT, UPDATE_FILTERS_EVENT, EMIT_SEARCH } from '../constants/events.js'
import { defaultFilters } from '../stores/reportFilters.js'
import {
  REPORT_DIPLOMA_KEY,
  resolveReportFilterDefs,
  decodeDiploma,
  encodeDiploma
} from '../constants/reports.js'

const props = defineProps({
  period: { type: Object, default: () => ({}) },
  filters: { type: Object, default: () => ({}) },
  fields: { type: Array, default: null }
})

const emit = defineEmits([UPDATE_PERIOD_EVENT, UPDATE_FILTERS_EVENT, EMIT_SEARCH])

const activeFilterDefs = computed(() => resolveReportFilterDefs(props.fields, true))

const normalizedFilters = computed(() => ({
  ...(props.filters || {}),
  [REPORT_DIPLOMA_KEY]: decodeDiploma(props.filters || {})
}))

function onRemoveFilter(key) {
  if (key === REPORT_DIPLOMA_KEY) {
    emit(UPDATE_FILTERS_EVENT, { ...props.filters, ...encodeDiploma('') })
  } else {
    emit(UPDATE_FILTERS_EVENT, { ...props.filters, [key]: '' })
  }
}

function onClearFilters() {
  emit(UPDATE_FILTERS_EVENT, defaultFilters())
}
</script>
