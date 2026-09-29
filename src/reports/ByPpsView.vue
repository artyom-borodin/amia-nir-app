<template>
  <ReportTableView :kind="REPORT_KIND_PPS" />
</template>

<script setup>
import ReportTableView from './ReportTableView.vue'
import { REPORT_KIND_PPS } from '../constants/tables.js'
</script>
