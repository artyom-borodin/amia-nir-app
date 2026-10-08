<template>
  <span class="nir-filter-contents">
    <template v-for="f in FILTER_FIELDS" :key="f.key">
      <el-form-item v-if="shown(f.key)" :label="f.label">
        <ReferenceSelect v-if="f.type === FIELD_TYPES.REF" :model-value="modelValue[f.key]" :endpoint="f.endpoint" :label-field="f.labelField" :placeholder="TEXT_ALL" @update:modelValue="setField(f.key, $event)" />
        <el-select v-else-if="f.type === FIELD_TYPES.SELECT" :model-value="modelValue[f.key]" clearable :placeholder="TEXT_ALL" @update:modelValue="setField(f.key, $event)">
          <el-option v-for="o in f.options" :key="o.value" :value="o.value" :label="o.label" />
        </el-select>
        <el-input v-else :model-value="modelValue[f.key]" clearable :placeholder="TEXT_ALL" @update:modelValue="setField(f.key, $event)" />
      </el-form-item>
    </template>
    <el-form-item :label="LABEL_DIPLOMA" v-if="shown('diploma')">
      <el-select :model-value="diplomaValue" clearable :placeholder="TEXT_ALL" @update:modelValue="setDiploma($event)">
        <el-option v-for="o in DIPLOMA_OPTIONS" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import ReferenceSelect from '../components/ReferenceSelect.vue'
import { COURSE, CONF_LEVEL, CONTEST_LEVEL, WORK_KIND, PUB_KIND, CONTEST_RESULT, EXHIBITION_RESULT, ACTIVITY_KIND, LEARNER_CATEGORIES, YES_NO_OPTIONS } from '../constants/choices.js'
import { TEXT_ALL, TEXT_CITY } from '../constants/texts.js'
import { DICT_LABEL_FIELD, DICT_FULL_NAME_FIELD, DICT_SUBDIVISION_FIELD } from '../constants/ui.js'
import { FIELD_TYPES } from '../constants/fieldTypes.js'

import { LABEL_PPS, LABEL_DEPARTMENT, LABEL_COURSE, LABEL_WORK_TYPE, LABEL_CIRCLE, LABEL_PROBLEM_GROUP, LABEL_ORGANIZATION, LABEL_CADET, LABEL_STUDENT, LABEL_FPK_STUDENT, LABEL_PUB_TYPE, LABEL_EVENT_LEVEL, LABEL_EVENT_FOUNDER, LABEL_DIPLOMA, LABEL_CERTIFICATE } from '../constants/labels.js'
import { REPORT_FILTER_ENDPOINTS, REPORT_COLUMN_LABELS, DIPLOMA_OPTIONS, decodeDiploma, encodeDiploma } from '../constants/reports.js'

const LEVELS = [...CONF_LEVEL, ...CONTEST_LEVEL]

const FILTER_FIELDS = [
  { key: 'cadet', label: LABEL_CADET, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.cadet, labelField: DICT_FULL_NAME_FIELD },
  { key: 'student', label: LABEL_STUDENT, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.student, labelField: DICT_FULL_NAME_FIELD },
  { key: 'fpk_student', label: LABEL_FPK_STUDENT, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.fpk_student, labelField: DICT_FULL_NAME_FIELD },
  { key: 'pps', label: LABEL_PPS, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.pps, labelField: DICT_FULL_NAME_FIELD },
  { key: 'department', label: LABEL_DEPARTMENT, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.department, labelField: DICT_SUBDIVISION_FIELD },
  { key: 'subdivision', label: REPORT_COLUMN_LABELS.faculty, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.subdivision, labelField: DICT_SUBDIVISION_FIELD },
  { key: 'circle', label: LABEL_CIRCLE, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.circle, labelField: DICT_LABEL_FIELD },
  { key: 'problem_group', label: LABEL_PROBLEM_GROUP, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.problem_group, labelField: DICT_LABEL_FIELD },
  { key: 'category', label: REPORT_COLUMN_LABELS.category, type: FIELD_TYPES.SELECT, options: LEARNER_CATEGORIES },
  { key: 'course', label: LABEL_COURSE, type: FIELD_TYPES.SELECT, options: COURSE },
  { key: 'level', label: LABEL_EVENT_LEVEL, type: FIELD_TYPES.SELECT, options: LEVELS },
  { key: 'founder', label: LABEL_EVENT_FOUNDER, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.founder, labelField: DICT_LABEL_FIELD },
  { key: 'city', label: TEXT_CITY, type: FIELD_TYPES.TEXT },
  { key: 'work_type', label: LABEL_WORK_TYPE, type: FIELD_TYPES.SELECT, options: WORK_KIND },
  { key: 'pub_type', label: LABEL_PUB_TYPE, type: FIELD_TYPES.SELECT, options: PUB_KIND },
  { key: 'title', label: REPORT_COLUMN_LABELS.title, type: FIELD_TYPES.TEXT },
  { key: 'has_electronic', label: REPORT_COLUMN_LABELS.has_electronic, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { key: 'has_print', label: REPORT_COLUMN_LABELS.has_print, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { key: 'result_category', label: REPORT_COLUMN_LABELS.result_category, type: FIELD_TYPES.SELECT, options: CONTEST_RESULT },
  { key: 'result', label: REPORT_COLUMN_LABELS.result, type: FIELD_TYPES.SELECT, options: EXHIBITION_RESULT },
  { key: 'activity_type', label: REPORT_COLUMN_LABELS.activity_type, type: FIELD_TYPES.SELECT, options: ACTIVITY_KIND },
  { key: 'organization', label: LABEL_ORGANIZATION, type: FIELD_TYPES.REF, endpoint: REPORT_FILTER_ENDPOINTS.organization, labelField: DICT_LABEL_FIELD },
  { key: 'has_certificate', label: LABEL_CERTIFICATE, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { key: 'gifted_db', label: REPORT_COLUMN_LABELS.gifted_db, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS },
  { key: 'president_fund', label: REPORT_COLUMN_LABELS.president_fund, type: FIELD_TYPES.SELECT, options: YES_NO_OPTIONS }
]

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  fields: { type: Array, default: null }
})

function shown(key) {
  return !props.fields || props.fields.includes(key)
}

const emit = defineEmits(['update:modelValue'])

const diplomaValue = computed(() => decodeDiploma(props.modelValue))

function setField(prop, val) {
  emit('update:modelValue', { ...props.modelValue, [prop]: val == null ? '' : val })
}

function setDiploma(val) {
  const v = val == null ? '' : val
  emit('update:modelValue', { ...props.modelValue, ...encodeDiploma(v) })
}
</script>
