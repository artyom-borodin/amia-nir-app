<template>
  <div class="nir-actions-bar">
    <el-button :type="BTN_PRIMARY" :loading="loading" :disabled="loading || exporting" @click="$emit('load')">{{ TEXT_GENERATE }}</el-button>
    <el-button :disabled="loading || exporting" @click="$emit('reset')">{{ TEXT_RESET }}</el-button>
    <el-button :loading="exporting" :disabled="loading || exporting" @click="$emit('export')">{{ TEXT_EXPORT_XLSX }}</el-button>
  </div>
</template>

<script setup>
import { TEXT_GENERATE, TEXT_RESET, TEXT_EXPORT_XLSX } from '../constants/texts.js'
import { BTN_PRIMARY } from '../constants/ui.js'

defineProps({
  loading: { type: Boolean, default: false },
  exporting: { type: Boolean, default: false }
})

defineEmits(['load', 'reset', 'export'])
</script>

