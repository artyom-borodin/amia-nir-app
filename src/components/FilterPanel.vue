<template>
  <el-card class="nir-filter-card" :shadow="UI_CARD_SHADOW">

    <el-form label-position="top" class="nir-filter-form" @submit.prevent="onSearch">
      <div ref="gridRef" class="nir-filter-grid" :class="{ 'is-collapsed': collapsible && collapsed }" @keydown.enter="onGridEnter">
        <el-form-item v-if="showSearch" :label="TEXT_SEARCH_ALL">
          <el-input
            v-model="search"
            :placeholder="TEXT_ALL"
            clearable
            @clear="onSearch"
          />
        </el-form-item>
        <slot />
        <div v-if="showActions || (collapsible && hasExtra)" class="nir-filter-actions">
          <el-button v-if="showActions" :type="BTN_PRIMARY" @click="onSearch">{{ TEXT_FIND }}</el-button>
          <el-button v-if="showActions" @click="onReset">{{ TEXT_RESET }}</el-button>
          <el-button v-if="collapsible && hasExtra" link :type="BTN_PRIMARY" @click="collapsed = !collapsed">
            {{ collapsed ? TEXT_SHOW_FILTERS : TEXT_HIDE_FILTERS }}
          </el-button>
        </div>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { computed, nextTick, onMounted, onUpdated, ref, watch } from 'vue'
import { VISIBLE_FILTERS, UI_CARD_SHADOW, BTN_PRIMARY, FILTER_SEARCH_PROP } from '../constants/ui.js'

import { UPDATE_MODEL_EVENT, EMIT_SEARCH, EMIT_RESET } from '../constants/events.js'
import { TEXT_SEARCH_ALL, TEXT_ALL, TEXT_FIND, TEXT_RESET, TEXT_SHOW_FILTERS, TEXT_HIDE_FILTERS } from '../constants/texts.js'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },

  showActions: { type: Boolean, default: true },

  showSearch: { type: Boolean, default: true },

  collapsible: { type: Boolean, default: false }
})
const emit = defineEmits([UPDATE_MODEL_EVENT, EMIT_SEARCH, EMIT_RESET])

const search = computed({
  get: () => props.modelValue?.[FILTER_SEARCH_PROP] ?? '',
  set: (v) => emit(UPDATE_MODEL_EVENT, { ...props.modelValue, [FILTER_SEARCH_PROP]: v })
})

const collapsed = ref(true)
const gridRef = ref(null)

const hasExtra = ref(false)

function applyCollapse() {
  const grid = gridRef.value
  if (!grid) return
  const items = grid.querySelectorAll('.el-form-item')
  const extra = items.length > VISIBLE_FILTERS
  if (hasExtra.value !== extra) hasExtra.value = extra
  const hide = !!(props.collapsible && collapsed.value)
  items.forEach((el, i) => {
    el.classList.toggle('nir-extra', hide && i >= VISIBLE_FILTERS)
  })
}

onMounted(() => nextTick(applyCollapse))
onUpdated(applyCollapse)
watch([collapsed, () => props.collapsible], applyCollapse)

function onGridEnter(e) {

  if (e && e.target && e.target.closest && e.target.closest('button, a')) return
  onSearch()
}

function onSearch() {
  emit(EMIT_SEARCH)
}

function onReset() {
  emit(UPDATE_MODEL_EVENT, { [FILTER_SEARCH_PROP]: '' })
  emit(EMIT_RESET)
}
</script>

