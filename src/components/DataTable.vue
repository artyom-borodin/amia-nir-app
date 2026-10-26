<template>
  <el-card class="nir-table-card" :shadow="UI_CARD_SHADOW">
    <div class="nir-table-scroll">
      <el-table
        v-bind="TABLE_ATTRS"
        :data="rows"
        :row-key="TABLE_ID_PROP"
        v-loading="loading"
        :empty-text="TEXT_EMPTY"
        header-cell-class-name="nir-th"
        class="nir-table"
        @sort-change="$emit(EMIT_SORT_CHANGE, $event)"
        @selection-change="$emit(EMIT_SELECTION_CHANGE, $event)"
      >
        <el-table-column
          v-if="showActions"
          type="selection"
          :width="TABLE_SELECTION_WIDTH"
          align="center"
        />
        <el-table-column
          v-for="c in normalizedColumns"
          :key="c.prop"
          :prop="c.prop"
          :label="c.label"
          :min-width="c.minWidth"
          :width="c.width"
          :fixed="c.fixed"
          :sortable="TABLE_SORT_CUSTOM"
        >
          <template #default="scope">
            <TableCell :row="scope.row" :prop="c.prop" />
          </template>
        </el-table-column>
        <el-table-column
          v-if="showActions"
          :label="TEXT_ACTIONS"
          :min-width="TABLE_ACTIONS_WIDTH"
          :width="TABLE_ACTIONS_WIDTH"
          :fixed="actionsFixed"
        >
          <template #default="scope">
            <div class="nir-actions">
              <el-button link :type="BTN_PRIMARY" :size="UI_SIZE_SMALL" :icon="EditPen" class="nir-action-link" @click="$emit(EMIT_EDIT, scope.row)">{{ TEXT_EDIT }}</el-button>
              <span class="nir-action-sep" aria-hidden="true" />
              <el-button link :type="BTN_DANGER" :size="UI_SIZE_SMALL" :icon="Delete" class="nir-action-link" @click="$emit(EMIT_REMOVE, scope.row)">{{ TEXT_DELETE }}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <NirPagination :page="page" :page-size="pageSize" :total="total" footer-class="nir-table-footer" @page-change="$emit(EMIT_PAGE_CHANGE, $event)" @size-change="$emit(EMIT_SIZE_CHANGE, $event)" />
  </el-card>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { EditPen, Delete } from '@element-plus/icons-vue'
import {
  UI_PAGE_SIZE,
  TABLE_ID_WIDTH,
  TABLE_SELECTION_WIDTH,
  TABLE_MIN_WIDTH,
  TABLE_DEFAULT_MIN_WIDTH,
  TABLE_ACTIONS_WIDTH,
  UI_CARD_SHADOW,
  UI_SIZE_SMALL,
  BTN_PRIMARY,
  BTN_DANGER,
  TABLE_SORT_CUSTOM,
  TABLE_FIXED_RIGHT,
  TABLE_ID_PROP,
  TABLE_ATTRS,
  WINDOW_RESIZE_EVT
} from '../constants/ui.js'
import { TEXT_EMPTY, TEXT_ACTIONS, TEXT_EDIT, TEXT_DELETE } from '../constants/texts.js'
import {
  EMIT_EDIT,
  EMIT_REMOVE,
  EMIT_PAGE_CHANGE,
  EMIT_SIZE_CHANGE,
  EMIT_SORT_CHANGE,
  EMIT_SELECTION_CHANGE
} from '../constants/events.js'
import { isMobileViewport } from '../utils/storage.js'
import NirPagination from './NirPagination.vue'
import TableCell from './TableCell.vue'

const props = defineProps({
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  total: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: UI_PAGE_SIZE },
  showActions: { type: Boolean, default: true }
})

defineEmits([
  EMIT_EDIT,
  EMIT_REMOVE,
  EMIT_PAGE_CHANGE,
  EMIT_SIZE_CHANGE,
  EMIT_SORT_CHANGE,
  EMIT_SELECTION_CHANGE
])

const isMobile = ref(isMobileViewport())
const actionsFixed = computed(() => (isMobile.value ? false : TABLE_FIXED_RIGHT))

function onWindowResize() {
  isMobile.value = isMobileViewport()
}

onMounted(() => window.addEventListener(WINDOW_RESIZE_EVT, onWindowResize))
onBeforeUnmount(() => window.removeEventListener(WINDOW_RESIZE_EVT, onWindowResize))

const normalizedColumns = computed(() =>
  (props.columns || []).map((c) => {
    if (c.prop === TABLE_ID_PROP) return { ...c, width: TABLE_ID_WIDTH, minWidth: TABLE_ID_WIDTH, fixed: false }
    const raw = Number(c.width)
    if (Number.isFinite(raw) && raw > 0) {
      const min = Math.max(raw, TABLE_MIN_WIDTH)
      return { ...c, width: undefined, minWidth: min }
    }
    return { ...c, width: undefined, minWidth: TABLE_DEFAULT_MIN_WIDTH }
  })
)
</script>
