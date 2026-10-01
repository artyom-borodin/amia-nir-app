<template>
  <div>
    <div class="nir-form-subtitle">{{ title }}</div>
    <el-form :model="local" :rules="rules" ref="formRef" class="nir-form" label-position="top">
      <el-form-item v-for="f in fields" :key="f.prop" :label="f.label" :prop="f.prop" :required="isRequired(f)">
        <el-input v-if="f.type === FIELD_TYPES.TEXT" v-model="local[f.prop]" :placeholder="f.placeholder" />
        <el-input v-else-if="f.type === FIELD_TYPES.NUMBER" v-model="local[f.prop]" type="number" :min="f.min" :max="f.max" />
        <el-date-picker v-else-if="f.type === FIELD_TYPES.DATE" v-model="local[f.prop]" type="date" :value-format="DATE_VALUE_FORMAT" class="nir-field-full" />
        <el-date-picker v-else-if="f.type === FIELD_TYPES.MONTH" v-model="local[f.prop]" type="month" :value-format="MONTH_VALUE_FORMAT" class="nir-field-full" />
        <div v-else-if="f.type === FIELD_TYPES.DATE_MONTH" class="nir-date-month">
          <el-select :model-value="dateMode[f.prop] || DATE_MODE_MONTH" @change="(v) => onModeChange(local, f.prop, v)" class="nir-date-mode">
            <el-option :value="DATE_MODE_DATE" :label="TEXT_DAY" />
            <el-option :value="DATE_MODE_MONTH" :label="TEXT_MONTH" />
          </el-select>
          <el-date-picker v-if="(dateMode[f.prop] || DATE_MODE_MONTH) === DATE_MODE_DATE" v-model="local[f.prop]" type="date" :value-format="DATE_VALUE_FORMAT" class="nir-field-flex" />
          <el-date-picker v-else v-model="local[f.prop]" type="month" :value-format="MONTH_VALUE_FORMAT" class="nir-field-flex" />
        </div>
        <el-select v-else-if="f.type === FIELD_TYPES.SELECT" v-model="local[f.prop]" class="nir-field-full" clearable filterable :placeholder="f.placeholder || TEXT_CHOOSE">
          <el-option v-for="o in f.options" :key="o.value" :value="o.value" :label="o.label" />
        </el-select>
        <ReferenceSelect v-else-if="f.type === FIELD_TYPES.REF" v-model="local[f.prop]" :endpoint="getEndpoint(f.ref)" :add-route="f.addRoute || ''" :add-label="f.addLabel || ''" />
        <el-checkbox v-else-if="f.type === FIELD_TYPES.BOOL" v-model="local[f.prop]" />
        <el-input v-else-if="f.type === FIELD_TYPES.TEXTAREA" v-model="local[f.prop]" type="textarea" :placeholder="f.placeholder" />
        <el-input v-else v-model="local[f.prop]" />
        <div v-if="f.hint" class="nir-form-hint">{{ f.hint }}</div>
        <div v-if="eventPreview && f.prop === eventPreview.watchProp && eventInfo" class="nir-event-info">
          <el-descriptions :column="1" :size="UI_SIZE_SMALL" border>
            <el-descriptions-item :label="eventPreview.titleLabel">{{ eventInfo.title }}</el-descriptions-item>
            <el-descriptions-item :label="TEXT_START_DATE">{{ eventInfo.start_date }}</el-descriptions-item>
            <el-descriptions-item :label="TEXT_END_DATE">{{ eventInfo.end_date }}</el-descriptions-item>
            <el-descriptions-item :label="TEXT_FOUNDER">{{ eventInfo.founder_name || eventInfo.founder }}</el-descriptions-item>
            <el-descriptions-item :label="TEXT_CITY">{{ eventInfo.city }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getEndpoint } from '../constants/tables.js'
import { isRequired } from '../features/_shared.js'
import {
  DATE_VALUE_FORMAT,
  MONTH_VALUE_FORMAT
} from '../constants/formats.js'
import { TEXT_CHOOSE, TEXT_DAY, TEXT_MONTH, TEXT_START_DATE, TEXT_END_DATE, TEXT_FOUNDER, TEXT_CITY } from '../constants/texts.js'
import { FIELD_TYPES } from '../constants/fieldTypes.js'
import { UI_SIZE_SMALL } from '../constants/ui.js'
import { UPDATE_MODEL_EVENT } from '../constants/events.js'
import ReferenceSelect from './ReferenceSelect.vue'
import { useSyncedLocal, validateForm } from '../composables/useSyncedLocal.js'
import { useDateMonth, DATE_MODE_DATE, DATE_MODE_MONTH } from '../composables/useDateMonth.js'
import { useEventInfo } from '../composables/useEventInfo.js'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  fields: { type: Array, default: () => [] },
  rules: { type: Object, default: () => ({}) },
  title: { type: String, default: '' },

  eventPreview: { type: Object, default: null }
})
const emit = defineEmits([UPDATE_MODEL_EVENT])

const { dateMode, applyModel, onModeChange } = useDateMonth(props.fields)
const { local } = useSyncedLocal(props, emit, (v) => applyModel(v))
const formRef = ref(null)
const { eventInfo } = useEventInfo(
  props.eventPreview?.endpoint,
  props.eventPreview ? () => local.value[props.eventPreview.watchProp] : null
)

async function validate() {
  return validateForm(formRef)
}
defineExpose({ validate })
</script>
