<template>
  <div :class="footerClass">
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="PAGE_SIZES"
      :total="total"
      :pager-count="PAGER_COUNT"
      background
      :layout="PAGINATION_LAYOUT"
      @current-change="$emit('page-change', $event)"
      @size-change="$emit('size-change', $event)"
    />
  </div>
</template>

<script setup>
import { PAGE_SIZES, PAGER_COUNT, PAGINATION_LAYOUT } from '../constants/ui.js'

defineProps({
  page: { type: Number, required: true },
  pageSize: { type: Number, required: true },
  total: { type: Number, required: true },
  footerClass: { type: String, default: 'nir-report-footer' }
})

defineEmits(['page-change', 'size-change'])
</script>
