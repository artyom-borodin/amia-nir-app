<template>
  <div v-if="items.length > 0" class="nir-toolbar-meta nir-active-filters">
    <span class="nir-active-filters-label">{{ TEXT_ACTIVE_FILTERS }}:</span>
    <el-popover
      v-for="item in items"
      :key="item.key"
      v-bind="ENTITY_POPOVER_ATTRS"
      :disabled="!item.card"
    >
      <template #reference>
        <el-tag
          :size="UI_SIZE_SMALL"
          :type="BTN_PRIMARY"
          :effect="TAG_EFFECT_LIGHT"
          closable
          class="nir-filter-chip"
          :class="{ 'is-interactive': Boolean(item.card) }"
          @close="$emit(EMIT_REMOVE, item.key)"
        >
          <span class="nir-filter-chip-key">{{ item.label }}:</span>
          <span class="nir-filter-chip-val">{{ item.valueText }}</span>
        </el-tag>
      </template>
      <EntityCard v-if="item.card" :card="item.card" />
    </el-popover>
    <el-button
      v-if="items.length > 1"
      link
      :type="BTN_PRIMARY"
      :size="UI_SIZE_SMALL"
      class="nir-filter-clear-btn"
      @click="$emit(EMIT_CLEAR)"
    >
      {{ TEXT_RESET }}
    </el-button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  BTN_PRIMARY,
  UI_SIZE_SMALL,
  TAG_EFFECT_LIGHT,
  ENTITY_POPOVER_ATTRS
} from '../constants/ui.js'
import { EMIT_REMOVE, EMIT_CLEAR } from '../constants/events.js'
import { TEXT_ACTIVE_FILTERS, TEXT_RESET } from '../constants/texts.js'
import { buildActiveFilterItems } from '../features/_shared.js'
import { useDictionariesStore } from '../stores/dictionaries.js'
import EntityCard from './EntityCard.vue'

const props = defineProps({
  filters: { type: Object, default: () => ({}) },
  filterDefs: { type: Array, default: () => [] }
})

defineEmits([EMIT_REMOVE, EMIT_CLEAR])

const store = useDictionariesStore()
const items = computed(() => buildActiveFilterItems(props.filters, props.filterDefs, store))
</script>
