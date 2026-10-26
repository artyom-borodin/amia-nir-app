<template>
  <div v-if="card && card.rich" class="nir-ref-option">
    <div class="nir-ref-option-head">
      <span class="nir-ref-option-title">{{ card.title }}</span>
      <el-tag v-if="card.badge" v-bind="CARD_TAG_ATTRS" :type="card.badge.type">
        {{ card.badge.text }}
      </el-tag>
    </div>
    <div v-if="card.subtitle" class="nir-ref-option-sub">{{ card.subtitle }}</div>
    <div v-if="card.tag || (card.meta && card.meta.length)" class="nir-ref-option-meta">
      <el-tag v-if="card.tag" v-bind="CARD_TAG_ATTRS" :type="card.tag.type">
        {{ card.tag.text }}
      </el-tag>
      <span v-for="(m, idx) in card.meta" :key="idx" class="nir-ref-meta-chip">
        <template v-if="isMetaObject(m)">
          <span v-if="m.label" class="nir-ref-meta-key">{{ m.label }}</span>
          <span class="nir-ref-meta-val">{{ m.value }}</span>
        </template>
        <template v-else>{{ m }}</template>
      </span>
    </div>
  </div>
  <span v-else class="nir-ref-option-simple">{{ (card && card.title) || label }}</span>
</template>

<script setup>
import { CARD_TAG_ATTRS } from '../constants/ui.js'
import { isMetaObject } from '../utils/entityCards.js'

defineProps({
  card: { type: Object, default: null },
  label: { type: String, default: '' }
})
</script>
