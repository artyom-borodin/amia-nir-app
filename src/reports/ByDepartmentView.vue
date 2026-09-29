<template>
  <ReportTableView :kind="REPORT_KIND_DEPARTMENT" />
</template>

<script setup>
import ReportTableView from './ReportTableView.vue'
import { REPORT_KIND_DEPARTMENT } from '../constants/tables.js'
</script>
