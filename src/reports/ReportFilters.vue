<template>
  <span class="nir-filter-contents">
    <template v-for="f in REPORT_FILTER_DEFS" :key="f.key">
      <el-form-item v-if="shown(f.key)" :label="f.label">
        <ReferenceSelect v-if="f.type === FIELD_TYPES.REF" :model-value="modelValue[f.key]" :endpoint="f.endpoint" :label-field="f.labelField" :placeholder="TEXT_ALL" @update:modelValue="setField(f.key, $event)" />
        <el-select v-else-if="f.type === FIELD_TYPES.SELECT" :model-value="modelValue[f.key]" clearable :placeholder="TEXT_ALL" @update:modelValue="setField(f.key, $event)">
          <el-option v-for="o in f.options" :key="o.value" :value="o.value" :label="o.label" />
        </el-select>
        <el-input v-else :model-value="modelValue[f.key]" clearable :placeholder="TEXT_ALL" @update:modelValue="setField(f.key, $event)" />
      </el-form-item>
    </template>
    <el-form-item v-if="shown(REPORT_DIPLOMA_KEY)" :label="LABEL_DIPLOMA">
      <el-select :model-value="diplomaValue" clearable :placeholder="TEXT_ALL" @update:modelValue="setDiploma($event)">
        <el-option v-for="o in DIPLOMA_OPTIONS" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import ReferenceSelect from '../components/ReferenceSelect.vue'
import { TEXT_ALL } from '../constants/texts.js'
import { FIELD_TYPES } from '../constants/fieldTypes.js'
import { LABEL_DIPLOMA } from '../constants/labels.js'
import { UPDATE_MODEL_EVENT } from '../constants/events.js'
import { applyLearnerExclusive } from '../features/_shared.js'
import {
  REPORT_FILTER_DEFS,
  REPORT_DIPLOMA_KEY,
  DIPLOMA_OPTIONS,
  decodeDiploma,
  encodeDiploma
} from '../constants/reports.js'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  fields: { type: Array, default: null }
})

const emit = defineEmits([UPDATE_MODEL_EVENT])

function shown(key) {
  return !props.fields || props.fields.includes(key)
}

const diplomaValue = computed(() => decodeDiploma(props.modelValue))

function setField(prop, val) {
  const next = { ...props.modelValue }
  applyLearnerExclusive(next, prop, val, '')
  emit(UPDATE_MODEL_EVENT, next)
}

function setDiploma(val) {
  const v = val == null ? '' : val
  emit(UPDATE_MODEL_EVENT, { ...props.modelValue, ...encodeDiploma(v) })
}
</script>
