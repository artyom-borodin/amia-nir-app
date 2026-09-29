<template>
  <ReportTableView :kind="REPORT_KIND_CATEGORY" show-course-tags />
</template>

<script setup>
import ReportTableView from './ReportTableView.vue'
import { REPORT_KIND_CATEGORY } from '../constants/tables.js'
</script>
