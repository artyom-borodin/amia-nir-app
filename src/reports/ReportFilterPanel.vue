<template>
  <div class="nir-report-filters">
    <PeriodFilter :model-value="period" @update:modelValue="$emit('update:period', $event)" />
    <FilterPanel :model-value="filters" :show-actions="false" :show-search="false" collapsible @search="$emit('search')">
      <ReportFilters :model-value="filters" :fields="fields" @update:modelValue="$emit('update:filters', $event)" />
    </FilterPanel>
  </div>
</template>

<script setup>
import PeriodFilter from '../components/PeriodFilter.vue'
import FilterPanel from '../components/FilterPanel.vue'
import ReportFilters from './ReportFilters.vue'

defineProps({
  period: { type: Object, default: () => ({}) },
  filters: { type: Object, default: () => ({}) },
  fields: { type: Array, default: null }
})

defineEmits(['update:period', 'update:filters', 'search'])
</script>
