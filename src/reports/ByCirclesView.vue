<template>
  <ReportTableView :kind="REPORT_KIND_CIRCLES" />
</template>

<script setup>
import ReportTableView from './ReportTableView.vue'
import { REPORT_KIND_CIRCLES } from '../constants/tables.js'
</script>
