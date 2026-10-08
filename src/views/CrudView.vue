<template>
  <div class="nir-crud">
    <h2 class="nir-crud-title">{{ title }}</h2>
    <component :is="currentList.component" v-if="currentList" :key="props.tableKey" v-bind="currentList.props" />
    <div v-else>
      <p>{{ TEXT_TABLE_NOT_FOUND }}: {{ tableKey }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getTable } from '../constants/tables.js'
import { TEXT_TABLE_NOT_FOUND, TEXT_TABLE_FALLBACK } from '../constants/texts.js'
import { CRUD_LIST_MAP } from '../features/registry.js'

const props = defineProps({ tableKey: { type: String, default: '' } })

const currentList = computed(() => CRUD_LIST_MAP[props.tableKey] || null)
const title = computed(() => {
  const t = getTable(props.tableKey)
  return t ? t.title : TEXT_TABLE_FALLBACK
})
</script>
