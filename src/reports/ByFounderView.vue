<template>
  <ReportTableView :kind="REPORT_KIND_FOUNDER" />
</template>

<script setup>
import ReportTableView from './ReportTableView.vue'
import { REPORT_KIND_FOUNDER } from '../constants/tables.js'
</script>
