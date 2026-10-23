<template>
  <el-button :icon="Download" :loading="exporting" :disabled="disabled || exporting" @click="$emit('export')">{{ TEXT_EXPORT_XLSX }}</el-button>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue'
import { TEXT_EXPORT_XLSX } from '../constants/texts.js'

defineProps({
  exporting: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

defineEmits(['export'])
</script>
