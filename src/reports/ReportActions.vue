<template>
  <div class="nir-actions-bar">
    <el-button :type="BTN_PRIMARY" :icon="VideoPlay" :loading="loading" :disabled="loading || exporting" @click="$emit(EMIT_LOAD)">{{ TEXT_GENERATE }}</el-button>
    <el-button :icon="RefreshLeft" :disabled="loading || exporting" @click="$emit(EMIT_RESET)">{{ TEXT_RESET }}</el-button>
    <ExportXlsxButton :mode="EXPORT_TARGET_REPORT" :kind="kind" :exporting="exporting" :disabled="loading" @export="$emit(EMIT_EXPORT, $event)" />
  </div>
</template>

<script setup>
import { VideoPlay, RefreshLeft } from '@element-plus/icons-vue'
import { TEXT_GENERATE, TEXT_RESET } from '../constants/texts.js'
import { BTN_PRIMARY } from '../constants/ui.js'
import { EMIT_LOAD, EMIT_RESET, EMIT_EXPORT } from '../constants/events.js'
import { EXPORT_TARGET_REPORT } from '../constants/reports.js'
import ExportXlsxButton from './ExportXlsxButton.vue'

defineProps({
  kind: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  exporting: { type: Boolean, default: false }
})

defineEmits([EMIT_LOAD, EMIT_RESET, EMIT_EXPORT])
</script>
