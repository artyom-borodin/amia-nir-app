<template>
  <ReportTableView :kind="REPORT_KIND_STATUS" />
</template>

<script setup>
import ReportTableView from './ReportTableView.vue'
import { REPORT_KIND_STATUS } from '../constants/tables.js'
</script>
