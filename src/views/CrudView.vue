<template>
  <div class="nir-crud">
    <div class="nir-page-header">
      <div class="nir-page-titles">
        <div class="nir-breadcrumbs">
          <router-link :to="ROUTE_HOME" class="nir-breadcrumb-link">{{ TEXT_HOME }}</router-link>
          <span class="nir-breadcrumb-sep">/</span>
          <span class="nir-breadcrumb-group">{{ groupLabel }}</span>
        </div>
        <h2 class="nir-crud-title">{{ title }}</h2>
      </div>
    </div>
    <component :is="currentList.component" v-if="currentList" :key="props.tableKey" v-bind="currentList.props" />
    <div v-else>
      <p>{{ TEXT_TABLE_NOT_FOUND }}: {{ tableKey }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getTableTitle, getTableGroupTitle } from '../constants/tables.js'
import { ROUTE_HOME } from '../constants/routes.js'
import { TEXT_TABLE_NOT_FOUND, TEXT_HOME } from '../constants/texts.js'
import { CRUD_LIST_MAP } from '../features/registry.js'

const props = defineProps({ tableKey: { type: String, default: '' } })

const currentList = computed(() => CRUD_LIST_MAP[props.tableKey] || null)
const title = computed(() => getTableTitle(props.tableKey))
const groupLabel = computed(() => getTableGroupTitle(props.tableKey))
</script>
