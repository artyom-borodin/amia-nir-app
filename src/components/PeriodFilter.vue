<template>
  <el-card class="nir-period-card" :shadow="UI_CARD_SHADOW">

    <el-form label-position="top" class="nir-period-form">
      <div class="nir-period-grid">
      <el-form-item :label="TEXT_PERIOD_LABEL" >
        <el-select v-model="local.kind" :placeholder="TEXT_PERIOD_PLACEHOLDER">
          <el-option v-for="p in PERIOD_TYPES" :key="p.value" :value="p.value" :label="p.label" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="local.kind === PERIOD_KIND_YEAR || local.kind === PERIOD_KIND_QUARTER || local.kind === PERIOD_KIND_MONTH" :label="TEXT_CALENDAR_YEAR_LABEL" class="nir-period-sm">
        <el-input v-model="local.year" :placeholder="TEXT_YEAR_PLACEHOLDER" :inputmode="INPUTMODE_NUMERIC" />
      </el-form-item>
      <el-form-item v-if="local.kind === PERIOD_KIND_QUARTER" :label="TEXT_QUARTER_LABEL" class="nir-period-sm">
        <el-select v-model="local.quarter" :placeholder="TEXT_QUARTER_LABEL">
          <el-option v-for="q in QUARTERS" :key="q" :value="String(q)" :label="String(q)" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="local.kind === PERIOD_KIND_MONTH" :label="TEXT_MONTH" class="nir-period-sm">
        <el-select v-model="local.month" :placeholder="TEXT_MONTH">
          <el-option v-for="m in MONTH_MAX" :key="m" :value="String(m)" :label="String(m)" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="local.kind === PERIOD_KIND_FIVE_YEAR" :label="TEXT_PERIOD_START_LABEL" class="nir-period-sm">
        <el-input v-model="local.startYear" :placeholder="TEXT_YEAR_PLACEHOLDER" :inputmode="INPUTMODE_NUMERIC" />
      </el-form-item>
      <el-form-item v-if="local.kind === PERIOD_KIND_FIVE_YEAR" :label="TEXT_PERIOD_RANGE_LABEL" >
        <el-input :model-value="fiveYearText" readonly :placeholder="TEXT_FIVE_YEAR_PLACEHOLDER" />
      </el-form-item>
      <el-form-item v-if="local.kind === PERIOD_KIND_RANGE" :label="TEXT_PERIOD_FROM_LABEL" >
        <el-date-picker v-model="local.dateFrom" type="date" :value-format="DATE_VALUE_FORMAT" :placeholder="TEXT_DATE_PLACEHOLDER_SHORT" clearable />
      </el-form-item>
      <el-form-item v-if="local.kind === PERIOD_KIND_RANGE" :label="TEXT_PERIOD_TO_LABEL" >
        <el-date-picker v-model="local.dateTo" type="date" :value-format="DATE_VALUE_FORMAT" :placeholder="TEXT_DATE_PLACEHOLDER_SHORT" clearable />
      </el-form-item>
      <el-form-item v-if="local.kind === PERIOD_KIND_STUDY_YEAR" :label="TEXT_STUDY_YEAR_LABEL" >
        <el-input v-model="local.studyYear" :placeholder="TEXT_STUDY_YEAR_PLACEHOLDER" :inputmode="INPUTMODE_NUMERIC" />
      </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import {
  PERIOD_TYPES,
  defaultPeriod,
  formatFiveYearRange,
  PERIOD_KIND_YEAR,
  PERIOD_KIND_QUARTER,
  PERIOD_KIND_MONTH,
  PERIOD_KIND_FIVE_YEAR,
  PERIOD_KIND_RANGE,
  PERIOD_KIND_STUDY_YEAR,
  QUARTERS,
  MONTH_MAX
} from '../constants/periods.js'
import { DATE_VALUE_FORMAT, INPUTMODE_NUMERIC } from '../constants/formats.js'
import { UI_CARD_SHADOW } from '../constants/ui.js'
import { UPDATE_MODEL_EVENT } from '../constants/events.js'
import { useSyncedLocal } from '../composables/useSyncedLocal.js'
import {
  TEXT_PERIOD_PLACEHOLDER,
  TEXT_YEAR_PLACEHOLDER,
  TEXT_PERIOD_LABEL,
  TEXT_CALENDAR_YEAR_LABEL,
  TEXT_QUARTER_LABEL,
  TEXT_MONTH,
  TEXT_PERIOD_START_LABEL,
  TEXT_PERIOD_RANGE_LABEL,
  TEXT_PERIOD_FROM_LABEL,
  TEXT_PERIOD_TO_LABEL,
  TEXT_STUDY_YEAR_LABEL,
  TEXT_FIVE_YEAR_PLACEHOLDER,
  TEXT_DATE_PLACEHOLDER_SHORT,
  TEXT_STUDY_YEAR_PLACEHOLDER
} from '../constants/texts.js'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) }
})
const emit = defineEmits([UPDATE_MODEL_EVENT])

const { local } = useSyncedLocal(props, emit, (v) => ({ ...defaultPeriod(), ...v }))

const fiveYearText = computed(() => formatFiveYearRange(local.value.startYear))
</script>

