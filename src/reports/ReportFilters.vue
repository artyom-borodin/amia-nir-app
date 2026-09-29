<template>
  <span class="nir-filter-contents">
    <el-form-item label="Курсант">
      <ReferenceSelect :model-value="modelValue.cadet" :endpoint="REPORT_FILTER_ENDPOINTS.cadet" :label-field="LABEL_FIELD_FULL_NAME" :placeholder="TEXT_ALL" @update:modelValue="setField('cadet', $event)" />
    </el-form-item>
    <el-form-item label="Студент">
      <ReferenceSelect :model-value="modelValue.student" :endpoint="REPORT_FILTER_ENDPOINTS.student" :label-field="LABEL_FIELD_FULL_NAME" :placeholder="TEXT_ALL" @update:modelValue="setField('student', $event)" />
    </el-form-item>
    <el-form-item label="Слушатель ФПК / Магистрант">
      <ReferenceSelect :model-value="modelValue.fpk_student" :endpoint="REPORT_FILTER_ENDPOINTS.fpk_student" :label-field="LABEL_FIELD_FULL_NAME" :placeholder="TEXT_ALL" @update:modelValue="setField('fpk_student', $event)" />
    </el-form-item>
    <el-form-item :label="LABEL_PPS">
      <ReferenceSelect :model-value="modelValue.pps" :endpoint="REPORT_FILTER_ENDPOINTS.pps" :label-field="LABEL_FIELD_FULL_NAME" :placeholder="TEXT_ALL" @update:modelValue="setField('pps', $event)" />
    </el-form-item>
    <el-form-item :label="LABEL_DEPARTMENT">
      <ReferenceSelect :model-value="modelValue.department" :endpoint="REPORT_FILTER_ENDPOINTS.department" :label-field="LABEL_FIELD_SUBDIVISION" :placeholder="TEXT_ALL" @update:modelValue="setField('department', $event)" />
    </el-form-item>
    <el-form-item label="Факультет">
      <ReferenceSelect :model-value="modelValue.subdivision" :endpoint="REPORT_FILTER_ENDPOINTS.subdivision" :label-field="LABEL_FIELD_SUBDIVISION" :placeholder="TEXT_ALL" @update:modelValue="setField('subdivision', $event)" />
    </el-form-item>
    <el-form-item :label="LABEL_CIRCLE">
      <ReferenceSelect :model-value="modelValue.circle" :endpoint="REPORT_FILTER_ENDPOINTS.circle" :label-field="DICT_LABEL_FIELD" :placeholder="TEXT_ALL" @update:modelValue="setField('circle', $event)" />
    </el-form-item>
    <el-form-item :label="LABEL_PROBLEM_GROUP">
      <ReferenceSelect :model-value="modelValue.problem_group" :endpoint="REPORT_FILTER_ENDPOINTS.problem_group" :label-field="DICT_LABEL_FIELD" :placeholder="TEXT_ALL" @update:modelValue="setField('problem_group', $event)" />
    </el-form-item>
    <el-form-item label="Категория (Статус)">
      <el-select :model-value="modelValue.category" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('category', $event)">
        <el-option v-for="o in LEARNER_CATEGORIES" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item :label="LABEL_COURSE">
      <el-select :model-value="modelValue.course" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('course', $event)">
        <el-option v-for="o in COURSE" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="Уровень конференции/конкурса">
      <el-select :model-value="modelValue.level" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('level', $event)">
        <el-option v-for="o in LEVELS" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="Учредитель конференции / конкурса">
      <ReferenceSelect :model-value="modelValue.founder" :endpoint="REPORT_FILTER_ENDPOINTS.founder" :label-field="DICT_LABEL_FIELD" :placeholder="TEXT_ALL" @update:modelValue="setField('founder', $event)" />
    </el-form-item>
    <el-form-item :label="TEXT_CITY">
      <el-input :model-value="modelValue.city" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('city', $event)" />
    </el-form-item>
    <el-form-item :label="LABEL_WORK_TYPE">
      <el-select :model-value="modelValue.work_type" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('work_type', $event)">
        <el-option v-for="o in WORK_KIND" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="Вид публикации">
      <el-select :model-value="modelValue.pub_type" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('pub_type', $event)">
        <el-option v-for="o in PUB_KIND" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="Категория (Результат)">
      <el-select :model-value="modelValue.result_category" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('result_category', $event)">
        <el-option v-for="o in CONTEST_RESULT" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="Вид деятельности">
      <el-select :model-value="modelValue.activity_type" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('activity_type', $event)">
        <el-option v-for="o in ACTIVITY_KIND" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="Наличие диплома">
      <el-select :model-value="diplomaValue" clearable :placeholder="TEXT_ALL" @update:modelValue="setDiploma($event)">
        <el-option v-for="o in DIPLOMA_OPTIONS" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="Наличие сертификата">
      <el-select :model-value="modelValue.has_certificate" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('has_certificate', $event)">
        <el-option v-for="o in YES_NO_OPTIONS" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="Банк данных одарённой молодёжи">
      <el-select :model-value="modelValue.gifted_db" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('gifted_db', $event)">
        <el-option v-for="o in YES_NO_OPTIONS" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="Поощрения специального фонда Президента Республики Беларусь">
      <el-select :model-value="modelValue.president_fund" clearable :placeholder="TEXT_ALL" @update:modelValue="setField('president_fund', $event)">
        <el-option v-for="o in YES_NO_OPTIONS" :key="o.value" :value="o.value" :label="o.label" />
      </el-select>
    </el-form-item>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import ReferenceSelect from '../components/ReferenceSelect.vue'
import { COURSE, CONF_LEVEL, CONTEST_LEVEL, WORK_KIND, PUB_KIND, CONTEST_RESULT, ACTIVITY_KIND, LEARNER_CATEGORIES, YES_NO_OPTIONS } from '../constants/choices.js'
import { TEXT_ALL, TEXT_CITY } from '../constants/texts.js'
import { DICT_LABEL_FIELD } from '../constants/ui.js'

import { LABEL_PPS, LABEL_DEPARTMENT, LABEL_COURSE, LABEL_WORK_TYPE, LABEL_CIRCLE, LABEL_PROBLEM_GROUP } from '../constants/labels.js'
import { REPORT_FILTER_ENDPOINTS, DIPLOMA_OPTIONS, decodeDiploma, encodeDiploma } from '../constants/reports.js'

const LEVELS = [...CONF_LEVEL, ...CONTEST_LEVEL]

const LABEL_FIELD_FULL_NAME = 'get_full_name'
const LABEL_FIELD_SUBDIVISION = 'subdivision_name'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) }
})

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

