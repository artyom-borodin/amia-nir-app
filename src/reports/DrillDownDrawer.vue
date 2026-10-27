<template>
  <el-drawer :model-value="modelValue" :title="title || TEXT_DRILL_TITLE" :size="drawerSize || DRAWER_DRILL_SIZE" :class="{ 'is-dragging': dragResizer }" @close="$emit(UPDATE_MODEL_EVENT, false)">
    <div class="nir-resizer nir-drawer-resizer" :class="{ 'is-active': hoverResizer || dragResizer }" :title="TEXT_RESIZE_HINT" @pointerdown="onResizeStart" @dblclick="onResizeReset" @mouseenter="hoverResizer = true" @mouseleave="hoverResizer = false" />
    <div class="nir-actions-bar">
      <ExportXlsxButton
        :mode="EXPORT_TARGET_DRILL"
        :columns="columns"
        :total-count="total"
        :page-count="pagedRows.length"
        :exporting="exporting"
        :disabled="!safeRows.length"
        @export="onExportDrill"
      />
    </div>
    <div class="nir-drill-scroll">
      <el-table
        v-if="columns && columns.length"
        v-bind="TABLE_ATTRS"
        :data="pagedRows"
        :empty-text="TEXT_EMPTY"
        class="nir-drill-table"
      >
        <el-table-column v-for="c in columns" :key="c.prop" :prop="c.prop" :label="c.label" :min-width="TABLE_DRILL_MIN_WIDTH">
          <template #default="scope">
            <TableCell :row="scope.row" :prop="c.prop" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <NirPagination :page="page" :page-size="pageSize" :total="total" @page-change="onPage" @size-change="onSize" />
    <el-empty v-if="!rows || !rows.length" :description="TEXT_EMPTY" />
  </el-drawer>
</template>

<script setup>
import { computed, watch } from 'vue'
import { TEXT_DRILL_TITLE, TEXT_EMPTY, TEXT_RESIZE_HINT } from '../constants/texts.js'
import { DRAWER_DRILL_SIZE, TABLE_ATTRS, TABLE_DRILL_MIN_WIDTH } from '../constants/ui.js'
import { STORAGE_DRILL_WIDTH_KEY } from '../constants/api.js'
import { UPDATE_MODEL_EVENT, EMIT_EXPORT } from '../constants/events.js'
import { EXPORT_TARGET_DRILL } from '../constants/reports.js'
import { usePagination } from '../composables/usePagination.js'
import { useDrawerResize } from '../composables/useDrawerResize.js'
import NirPagination from '../components/NirPagination.vue'
import TableCell from '../components/TableCell.vue'
import ExportXlsxButton from './ExportXlsxButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  exporting: { type: Boolean, default: false }
})

const emit = defineEmits([UPDATE_MODEL_EVENT, EMIT_EXPORT])

const { page, pageSize, resetPage, withPageScope, paginateRows, onPage, onSize } = usePagination()
const { drawerSize, hoverResizer, dragResizer, onResizeStart, onResizeReset } = useDrawerResize(STORAGE_DRILL_WIDTH_KEY)
const safeRows = computed(() => props.rows ?? [])
const total = computed(() => safeRows.value.length)
const pagedRows = computed(() => paginateRows(safeRows.value))

watch([() => props.rows, () => props.modelValue], resetPage)

function onExportDrill(opts = {}) {
  emit(EMIT_EXPORT, withPageScope(opts))
}
</script>
