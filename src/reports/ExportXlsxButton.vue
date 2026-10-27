<template>
  <el-button-group class="nir-export-group">
    <el-button
      :type="BTN_SUCCESS"
      :icon="Download"
      :loading="exporting"
      :disabled="disabled || exporting"
      @click="onExportNow"
    >
      {{ TEXT_EXPORT_XLSX }}
    </el-button>
    <el-button
      :type="BTN_SUCCESS"
      :icon="Setting"
      :disabled="disabled || exporting"
      :title="TEXT_EXPORT_SETTINGS_TITLE"
      class="nir-export-cfg-btn"
      @click="dialogOpen = true"
    >
      <span v-if="hasCustomSettings" class="nir-export-cfg-dot" />
    </el-button>
  </el-button-group>

  <el-dialog
    v-model="dialogOpen"
    :title="TEXT_EXPORT_SETTINGS_TITLE"
    :width="EXPORT_DIALOG_WIDTH"
    align-center
    append-to-body
    destroy-on-close
    class="nir-export-dialog"
  >
    <div class="nir-export-panel">
      <div v-if="isReportMode" class="nir-export-section">
        <div class="nir-export-section-label">{{ TEXT_EXPORT_DETAILS_MODE }}</div>
        <div class="nir-export-mode-grid">
          <label
            v-for="m in EXPORT_DETAILS_MODES"
            :key="m.value"
            class="nir-export-mode-item"
            :class="{ 'is-active': detailsMode === m.value }"
          >
            <input
              v-model="detailsMode"
              type="radio"
              :value="m.value"
              class="nir-export-mode-radio"
            />
            <div class="nir-export-mode-body">
              <div class="nir-export-mode-title">{{ m.label }}</div>
              <div class="nir-export-mode-hint">{{ m.hint }}</div>
            </div>
          </label>
        </div>
      </div>

      <div v-else class="nir-export-section">
        <div class="nir-export-section-label">{{ TEXT_EXPORT_SCOPE }}</div>
        <div class="nir-export-scope-list">
          <label
            v-for="s in scopeOptions"
            :key="s.value"
            class="nir-export-scope-item"
            :class="{ 'is-active': exportScope === s.value, 'is-disabled': s.disabled }"
          >
            <input
              v-model="exportScope"
              type="radio"
              :value="s.value"
              :disabled="s.disabled"
              class="nir-export-mode-radio"
            />
            <span class="nir-export-scope-text">{{ s.label }}</span>
            <span v-if="s.showBadge" class="nir-export-scope-badge">{{ s.count }}</span>
          </label>
        </div>
      </div>

      <div v-for="sec in checkSections" :key="sec.key" class="nir-export-section">
        <div class="nir-export-section-head">
          <span class="nir-export-section-label">
            {{ sec.label }}
            <span class="nir-export-counter">
              ({{ sec.selected.length }}/{{ sec.items.length }})
            </span>
          </span>
          <div class="nir-export-quick-links">
            <el-button link :type="BTN_PRIMARY" :size="UI_SIZE_SMALL" @click="sec.onSelectAll">
              {{ TEXT_ALL }}
            </el-button>
            <el-button
              v-if="sec.showDefault"
              link
              :type="BTN_PRIMARY"
              :size="UI_SIZE_SMALL"
              @click="sec.onSelectDefault"
            >
              {{ TEXT_EXPORT_SELECT_DEFAULT }}
            </el-button>
          </div>
        </div>
        <el-checkbox-group
          :model-value="sec.selected"
          :min="1"
          class="nir-export-check-grid"
          @update:model-value="sec.onChange"
        >
          <el-checkbox
            v-for="item in sec.items"
            :key="item.prop"
            :value="item.prop"
            class="nir-export-check-item"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div v-if="!isSummaryReport || isReportMode" class="nir-export-section">
        <div class="nir-export-section-label">{{ TEXT_EXPORT_OPTIONS }}</div>
        <div class="nir-export-opts-list">
          <el-checkbox v-if="!isSummaryReport" v-model="includeTotals">
            {{ TEXT_EXPORT_INCLUDE_TOTALS }}
          </el-checkbox>
          <el-checkbox v-if="isReportMode" v-model="hideZeroRows">
            {{ TEXT_EXPORT_HIDE_ZERO_ROWS }}
          </el-checkbox>
          <el-checkbox v-if="isReportMode && hasInlineDetails" v-model="expandGroups">
            {{ TEXT_EXPORT_EXPAND_GROUPS }}
          </el-checkbox>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="nir-export-dialog-foot">
        <el-button v-if="hasCustomSettings" :icon="RefreshLeft" @click="onResetSettings">
          {{ TEXT_RESET }}
        </el-button>
        <div class="nir-export-dialog-actions">
          <el-button @click="dialogOpen = false">{{ TEXT_CANCEL }}</el-button>
          <el-button
            :type="BTN_SUCCESS"
            :icon="Download"
            :loading="exporting"
            :disabled="disabled || exporting"
            @click="onExportFromDialog"
          >
            {{ TEXT_EXPORT_DOWNLOAD }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { Download, Setting, RefreshLeft } from '@element-plus/icons-vue'
import {
  TEXT_ALL,
  TEXT_EXPORT_XLSX,
  TEXT_RESET,
  TEXT_CANCEL,
  TEXT_EXPORT_SETTINGS_TITLE,
  TEXT_EXPORT_DOWNLOAD,
  TEXT_EXPORT_DETAILS_MODE,
  TEXT_EXPORT_SCOPE,
  TEXT_EXPORT_OPTIONS,
  TEXT_EXPORT_INCLUDE_TOTALS,
  TEXT_EXPORT_HIDE_ZERO_ROWS,
  TEXT_EXPORT_EXPAND_GROUPS,
  TEXT_EXPORT_SELECT_DEFAULT
} from '../constants/texts.js'
import { BTN_SUCCESS, BTN_PRIMARY, UI_SIZE_SMALL, EXPORT_DIALOG_WIDTH } from '../constants/ui.js'
import { EMIT_EXPORT } from '../constants/events.js'
import { EXPORT_TARGET_REPORT, EXPORT_DETAILS_MODES } from '../constants/reports.js'
import { useExportSettings } from '../composables/useExportSettings.js'

const props = defineProps({
  exporting: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  mode: { type: String, default: EXPORT_TARGET_REPORT },
  kind: { type: String, default: '' },
  columns: { type: Array, default: () => [] },
  totalCount: { type: Number, default: 0 },
  pageCount: { type: Number, default: 0 },
  selectedCount: { type: Number, default: 0 }
})

const emit = defineEmits([EMIT_EXPORT])

const {
  dialogOpen,
  isReportMode,
  isSummaryReport,
  detailsMode,
  exportScope,
  includeTotals,
  hideZeroRows,
  expandGroups,
  hasInlineDetails,
  scopeOptions,
  checkSections,
  hasCustomSettings,
  onResetSettings,
  onExportNow,
  onExportFromDialog
} = useExportSettings(props, emit)
</script>
