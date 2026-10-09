<template>
  <el-button :loading="exporting" :disabled="disabled || exporting" @click="$emit('export')">{{ TEXT_EXPORT_XLSX }}</el-button>
</template>

<script setup>
import { TEXT_EXPORT_XLSX } from '../constants/texts.js'

defineProps({
  exporting: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

defineEmits(['export'])
</script>
