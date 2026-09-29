<template>
  <el-card class="nir-table-card" :shadow="UI_CARD_SHADOW">
    <div class="nir-table-scroll">
      <el-table
        :data="rows"
        v-loading="loading"
        stripe
        fit
        :table-layout="TABLE_LAYOUT_AUTO"
        :empty-text="TEXT_EMPTY"
        header-cell-class-name="nir-th"
        class="nir-table"
        @sort-change="$emit('sort-change', $event)"
      >
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
            <span class="nir-cell">{{ formatCell(scope.row[c.prop]) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="showActions"
          :label="TEXT_ACTIONS"
          :min-width="TABLE_ACTIONS_WIDTH"
          :width="TABLE_ACTIONS_WIDTH"
          :fixed="TABLE_FIXED_RIGHT"
        >
          <template #default="scope">
            <div class="nir-actions">
              <el-button :size="UI_SIZE_SMALL" @click="$emit('edit', scope.row)">{{ TEXT_EDIT }}</el-button>
              <el-button :size="UI_SIZE_SMALL" :type="BTN_DANGER" @click="$emit('remove', scope.row)">{{ TEXT_DELETE }}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="nir-table-footer">
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
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import {
  UI_PAGE_SIZE,
  TABLE_ID_WIDTH,
  TABLE_MIN_WIDTH,
  TABLE_DEFAULT_MIN_WIDTH,
  TABLE_ACTIONS_WIDTH,
  PAGE_SIZES,
  PAGER_COUNT,
  UI_CARD_SHADOW,
  UI_SIZE_SMALL,
  BTN_DANGER,
  TABLE_LAYOUT_AUTO,
  TABLE_SORT_CUSTOM,
  TABLE_FIXED_RIGHT,
  TABLE_ID_PROP,
  PAGINATION_LAYOUT
} from '../constants/ui.js'
import { TEXT_EMPTY, TEXT_ACTIONS, TEXT_EDIT, TEXT_DELETE } from '../constants/texts.js'
import { formatBoolCell } from '../utils/format.js'

const props = defineProps({
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  total: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: UI_PAGE_SIZE },
  showActions: { type: Boolean, default: true }
})

defineEmits(['edit', 'remove', 'page-change', 'size-change', 'sort-change'])

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

function formatCell(value) {
  const b = formatBoolCell(value)
  if (b !== undefined) return b
  return value
}
</script>

