<template>
  <span v-if="prop === TABLE_ID_PROP" class="nir-id-badge">#{{ cellValue }}</span>
  <el-popover v-else-if="hasRichCards" v-bind="ENTITY_POPOVER_ATTRS">
    <template #reference>
      <span class="nir-cell nir-cell-card-trigger">
        <span class="nir-cell-trigger-text">{{ triggerText }}</span>
        <span v-if="extraCount > 0" class="nir-cell-more-badge">{{ formatMoreCount(extraCount) }}</span>
      </span>
    </template>
    <div v-if="cards.length > 1" class="nir-entity-popover-list-wrap">
      <div class="nir-entity-popover-head">
        <span class="nir-entity-popover-head-title">{{ TEXT_GROUP_MEMBERS_TITLE }}</span>
        <span class="nir-entity-popover-head-count">{{ cards.length }}</span>
      </div>
      <div class="nir-entity-card-list">
        <EntityCard v-for="(c, idx) in cards" :key="idx" :card="c" class="nir-entity-card-item" />
      </div>
    </div>
    <EntityCard v-else :card="cards[0]" />
  </el-popover>
  <el-tag
    v-else-if="prop && isTagColumn(prop, cellValue)"
    :size="UI_SIZE_SMALL"
    :type="resolveCellTagType(prop, cellValue)"
    :effect="TAG_EFFECT_LIGHT"
    :title="formattedValue"
    class="nir-cell-tag"
  >
    {{ formattedValue }}
  </el-tag>
  <span v-else class="nir-cell" :title="formattedValue">{{ formattedValue }}</span>
</template>

<script setup>
import { computed } from 'vue'
import {
  TABLE_ID_PROP,
  UI_SIZE_SMALL,
  TAG_EFFECT_LIGHT,
  ENTITY_POPOVER_ATTRS,
  MULTI_CARD_PREVIEW_LIMIT
} from '../constants/ui.js'
import { LIST_JOINER } from '../constants/formats.js'
import { TEXT_GROUP_MEMBERS_TITLE, formatMoreCount } from '../constants/texts.js'
import { TABLE_MEMBERS_COUNT_PROP } from '../constants/reports.js'
import { formatTableCell, isTagColumn, resolveCellTagType } from '../utils/format.js'
import { resolveCellCards } from '../utils/entityCards.js'
import { useDictionariesStore } from '../stores/dictionaries.js'
import EntityCard from './EntityCard.vue'

const props = defineProps({
  row: { type: Object, default: null },
  prop: { type: String, default: '' },
  value: { type: [String, Number, Boolean, Array, Object], default: undefined }
})

const store = useDictionariesStore()

const cellValue = computed(() => {
  if (props.value !== undefined) return props.value
  return props.row && props.prop ? props.row[props.prop] : ''
})

const cards = computed(() => resolveCellCards(props.row, props.prop, store))
const hasRichCards = computed(() => {
  if (!cards.value || !cards.value.length) return false
  if (props.prop === TABLE_MEMBERS_COUNT_PROP) return true
  if (cards.value.length > 1) return true
  return Boolean(cards.value[0]?.rich)
})

const formattedValue = computed(() => formatTableCell(cellValue.value))

const triggerText = computed(() => {
  if (!cards.value || !cards.value.length) return formattedValue.value
  if (props.prop === TABLE_MEMBERS_COUNT_PROP) return formattedValue.value
  if (cards.value.length > 1) {
    return cards.value
      .slice(0, MULTI_CARD_PREVIEW_LIMIT)
      .map((c) => c.title)
      .filter(Boolean)
      .join(LIST_JOINER)
  }
  return formattedValue.value || cards.value[0].title
})

const extraCount = computed(() => {
  if (props.prop === TABLE_MEMBERS_COUNT_PROP) return 0
  if (!cards.value || cards.value.length <= MULTI_CARD_PREVIEW_LIMIT) return 0
  return cards.value.length - MULTI_CARD_PREVIEW_LIMIT
})
</script>
