<template>
  <el-drawer :model-value="modelValue" :size="size" :close-on-click-modal="closeOnClickModal" @close="$emit(UPDATE_MODEL_EVENT, false)">
    <template #title>
      <span class="nir-drawer-title">{{ title }}</span>
    </template>
    <slot />
    <template #footer>
      <el-button @click="$emit(UPDATE_MODEL_EVENT, false)">{{ TEXT_CANCEL }}</el-button>
      <el-button :type="BTN_PRIMARY" :loading="loading" @click="$emit(EMIT_SAVE)">{{ TEXT_SAVE }}</el-button>
    </template>
  </el-drawer>
</template>

<script setup>
import { TEXT_CANCEL, TEXT_SAVE, TEXT_DEFAULT_RECORD } from '../constants/texts.js'
import { DRAWER_FORM_SIZE, BTN_PRIMARY } from '../constants/ui.js'
import { UPDATE_MODEL_EVENT, EMIT_SAVE } from '../constants/events.js'

defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: TEXT_DEFAULT_RECORD },
  loading: { type: Boolean, default: false },
  size: { type: String, default: DRAWER_FORM_SIZE },
  closeOnClickModal: { type: Boolean, default: false }
})

defineEmits([UPDATE_MODEL_EVENT, EMIT_SAVE])
</script>
