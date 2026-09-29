<template>
  <ReportTableView :kind="REPORT_KIND_FACULTY" />
</template>

<script setup>
import ReportTableView from './ReportTableView.vue'
import { REPORT_KIND_FACULTY } from '../constants/tables.js'
</script>
