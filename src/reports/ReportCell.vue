<template>
  <el-link v-if="drillable" :type="BTN_PRIMARY" :underline="false" class="nir-drill-pill" @click="$emit(EMIT_DRILL)">
    <span>{{ value }}</span>
  </el-link>
  <span v-else-if="showCourseTags && isCourseMap(value)" class="nir-course-tags">
    <el-link
      v-for="(count, course) in value"
      :key="course"
      :type="BTN_PRIMARY"
      :underline="false"
      class="nir-drill-pill nir-course-drill-pill"
      @click="$emit(EMIT_DRILL_COURSE, course, count)"
    >
      <span class="nir-course-pill-label">{{ formatCourseLabel(course) }}:</span>
      <span class="nir-course-pill-val">{{ count }}</span>
    </el-link>
  </span>
  <span v-else-if="showCourseTags && isEmptyCourseMap(value)" class="nir-zero-cell">0</span>
  <span v-else-if="value === 0" class="nir-zero-cell">0</span>
  <TableCell v-else :row="row" :prop="prop" :value="value" />
</template>

<script setup>
import { BTN_PRIMARY } from '../constants/ui.js'
import { EMIT_DRILL, EMIT_DRILL_COURSE } from '../constants/events.js'
import { formatCourseLabel } from '../constants/texts.js'
import TableCell from '../components/TableCell.vue'
import { isCourseMap, isEmptyCourseMap } from './reportHelpers.js'

defineProps({
  row: { type: Object, default: null },
  prop: { type: String, default: '' },
  value: { type: [String, Number, Boolean, Array, Object], default: '' },
  drillable: { type: Boolean, default: false },
  showCourseTags: { type: Boolean, default: false }
})

defineEmits([EMIT_DRILL, EMIT_DRILL_COURSE])
</script>
