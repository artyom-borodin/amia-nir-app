<template>
  <ReportTableView :kind="REPORT_KIND_STUDENT" />
</template>

<script setup>
import ReportTableView from './ReportTableView.vue'
import { REPORT_KIND_STUDENT } from '../constants/tables.js'
</script>
