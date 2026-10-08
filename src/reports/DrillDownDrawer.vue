<template>
  <el-drawer :model-value="modelValue" :title="title || TEXT_DRILL_TITLE" :size="DRAWER_DRILL_SIZE" @close="$emit('update:modelValue', false)">
    <div class="nir-drill-scroll">
      <el-table
        v-if="columns && columns.length"
        v-bind="TABLE_ATTRS"
        :data="rows"
        :empty-text="TEXT_EMPTY"
        class="nir-drill-table"
      >
        <el-table-column v-for="c in columns" :key="c.prop" :prop="c.prop" :label="c.label" :min-width="TABLE_DRILL_MIN_WIDTH">
          <template #default="scope">
            {{ formatTableCell(scope.row[c.prop]) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-empty v-if="!rows || !rows.length" :description="TEXT_EMPTY" />
  </el-drawer>
</template>

<script setup>
import { TEXT_DRILL_TITLE, TEXT_EMPTY } from '../constants/texts.js'
import { DRAWER_DRILL_SIZE, TABLE_ATTRS, TABLE_DRILL_MIN_WIDTH } from '../constants/ui.js'

import { formatTableCell } from '../utils/format.js'

defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] }
})

defineEmits(['update:modelValue'])

</script>

